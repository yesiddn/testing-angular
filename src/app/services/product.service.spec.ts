import { TestBed } from "@angular/core/testing";
import { ProductService } from "./product.service";
import { HTTP_INTERCEPTORS, HttpClientModule, HttpStatusCode, provideHttpClient, withInterceptors, withInterceptorsFromDi } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { CreateProductDTO, Product, UpdateProductDTO } from "../models/product.model";
import { generateManyProducts, generateOneProduct } from "../models/product.mock";
import { TokenInterceptor } from "../interceptor/tokent.interceptor";
import { TokenService } from "./token.service";

describe('ProductService', () => {
  let productService: ProductService;
  let httpTestController: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // imports: [HttpClientModule], // sin el import de HttpClient, el test falla, pero hay un modulo de testing que se llama HttpClientTestingModule
      // https://angular.dev/guide/http/testing
      providers: [
        provideHttpClient(withInterceptorsFromDi()), // usando withInterceptorsFromDi() para seguir usando clases como interceptors
        provideHttpClientTesting(),
        ProductService,
        TokenService, // tambien se puede crear un spy
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true,
        }
      ]
    });

    httpTestController = TestBed.inject(HttpTestingController);
    productService = TestBed.inject(ProductService);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(() => {
    httpTestController.verify();
  });

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  describe('tests for getProductsSimple', () => {
    it('should return a product list', () => {
      // Arrange
      const mockProducts: Product[] = generateManyProducts(2);

      // Act
      productService.getProductsSimple().subscribe((products) => {
        // Assert
        expect(products.length).toEqual(mockProducts.length);
        expect(products).toEqual(mockProducts);
      });

      // http config
      const req = httpTestController.expectOne('https://api.escuelajs.co/api/v1/products'); // se espera una peticion a esa url
      req.flush(mockProducts); // se responde con los productos mockeados

      // httpTestController.verify(); // verifica que no haya mas peticiones pendientes y que se hayan respondido todas
    });
  });

  describe('tests for getAllProducts', () => {
    fit('should return a product list', () => {
      // Arrange
      const mockProducts: Product[] = generateManyProducts(2);
      spyOn(tokenService, 'getToken').and.returnValue('token.123'); // de esta forma se espia un solo metodo de un servicio

      // Act
      productService.getAllProducts().subscribe((products) => {
        // Assert
        expect(products.length).toEqual(mockProducts.length);
      });

      // http config
      const req = httpTestController.expectOne('https://api.escuelajs.co/api/v1/products'); // se espera una peticion a esa url

      const headers = req.request.headers; // se obtienen los headers de la peticion
      expect(headers.get('Authorization')).toEqual('Bearer token.123'); // se espera que el token sea el que se espia

      req.flush(mockProducts); // se responde con los productos mockeados

      // httpTestController.verify(); // verifica que no haya mas peticiones pendientes y que se hayan respondido todas
    });

    it('should reutrn product list with taxes', () => {
      const mockProducts: Product[] = [
        {
          ...generateOneProduct(),
          price: 100,
        },
        {
          ...generateOneProduct(),
          price: 200,
        },
        {
          ...generateOneProduct(),
          price: 0, // tax = 0
        },
        {
          ...generateOneProduct(),
          price: -100, // tax = 0
        }
      ];

      productService.getAllProducts().subscribe((products) => {
        expect(products.length).toEqual(mockProducts.length);
        expect(products[0].taxes).toEqual(19);
        expect(products[1].taxes).toEqual(38);
        expect(products[2].taxes).toEqual(0);
        expect(products[3].taxes).toEqual(0);
      });

      const req = httpTestController.expectOne('https://api.escuelajs.co/api/v1/products');
      req.flush(mockProducts);

      // httpTestController.verify();
    });

    it('should send query params with limit 10 and offset 3', () => {
      // Arrange
      const mockProducts: Product[] = generateManyProducts(2);
      const limit = 10;
      const offset = 3;

      // Act
      productService.getAllProducts(limit, offset).subscribe((products) => {
        // Assert
        expect(products.length).toEqual(mockProducts.length);
      });

      const url = `https://api.escuelajs.co/api/v1/products?limit=${limit}&offset=${offset}`;
      const req = httpTestController.expectOne(url);
      req.flush(mockProducts);
      const params = req.request.params; // se obtienen los parametros de la peticion
      expect(params.get('limit')).toEqual(limit.toString());
      expect(params.get('offset')).toEqual(offset.toString());

      // httpTestController.verify();
    });
  });

  describe('tests for create product', () => {
    it('should create a product', (doneFn) => {
      // Arrange
      const mockProduct: Product = generateOneProduct();
      const productDto: CreateProductDTO = {
        title: mockProduct.title,
        description: mockProduct.description,
        price: mockProduct.price,
        images: mockProduct.images,
        categoryId: mockProduct.category.id,
      }

      // Act
      productService.create({...productDto}).subscribe({
        next: (createdProduct) => {
          // Assert
          expect(createdProduct).toEqual(mockProduct);
          doneFn();
        },
        error: (error) => {
          doneFn.fail(error);
        }
      });

      // http config
      const req = httpTestController.expectOne('https://api.escuelajs.co/api/v1/products');
      req.flush(mockProduct);

      expect(req.request.body).toEqual(productDto);
      expect(req.request.method).toEqual('POST');

      // httpTestController.verify();
    });
  });

  describe('tests for update product', () => {
    it('should update a product', (doneFn) => {
      // Arrange
      const mockData: Product = generateOneProduct();
      const productDto: UpdateProductDTO = {
        title: 'New Product Title',
        description: 'New Product Description',
      }
      const productId = mockData.id;

      // Act
      productService.update(productId, {...productDto}).subscribe({
        next: (updatedProduct) => {
          // Assert
          expect(updatedProduct).toEqual(mockData);
          doneFn();
        },
        error: (error) => {
          doneFn.fail(error);
        }
      });

      // http config
      const req = httpTestController.expectOne(`https://api.escuelajs.co/api/v1/products/${productId}`);
      req.flush(mockData);

      expect(req.request.body).toEqual(productDto);
      expect(req.request.method).toEqual('PUT');
    });
  });

  describe('tests for detele product', () => {
    it('should delete a product', (doneFn) => {
      // Arrange
      const mockData = true;
      const productId = 1;

      // Act
      productService.delete(productId).subscribe({
        next: (deleted) => {
          // Assert
          expect(deleted).toEqual(mockData);
          doneFn();
        },
        error: (error) => {
          doneFn.fail(error);
        }
      });

      // http config
      const req = httpTestController.expectOne(`https://api.escuelajs.co/api/v1/products/${productId}`);
      req.flush(mockData);

      expect(req.request.method).toEqual('DELETE');
    });
  });

  fdescribe('tests for getOne', () => {
    it('should return a product', (doneFn) => {
      // Arrange
      const mockData: Product = generateOneProduct();
      const productId = mockData.id;

      // Act
      productService.getOne(productId).subscribe({
        next: (updatedProduct) => {
          // Assert
          expect(updatedProduct).toEqual(mockData);
          doneFn();
        },
        error: (error) => {
          doneFn.fail(error);
        }
      });

      // http config
      const req = httpTestController.expectOne(`https://api.escuelajs.co/api/v1/products/${productId}`);
      req.flush(mockData);

      expect(req.request.method).toEqual('GET');
    });

    it('should return the right message when status code is 404', (doneFn) => {
      // Arrange
      const productId = 2;
      const msgError = 'No se encontro el producto';
      const mockError = {
        status: HttpStatusCode.NotFound, // 404
        statusText: msgError,
      }

      // Act
      productService.getOne(productId).subscribe({
        next: (updatedProduct) => {
          // Assert
          // expect(updatedProduct).toEqual(mockData);
          // doneFn();
        },
        error: (error) => {
          // Assert
          expect(error).toEqual(msgError);
          doneFn();
        }
      });

      // http config
      const req = httpTestController.expectOne(`https://api.escuelajs.co/api/v1/products/${productId}`);
      req.flush(msgError, mockError);

      expect(req.request.method).toEqual('GET');
    });

    it('should return the right message when status code is 409', (doneFn) => {
      // Arrange
      const productId = 2;
      const msgError = 'Algo esta fallando en el server';
      const mockError = {
        status: HttpStatusCode.Conflict, // 409
        statusText: msgError,
      }

      // Act
      productService.getOne(productId).subscribe({
        next: (updatedProduct) => {
          // Assert
          // expect(updatedProduct).toEqual(mockData);
          // doneFn();
        },
        error: (error) => {
          // Assert
          expect(error).toEqual(msgError);
          doneFn();
        }
      });

      // http config
      const req = httpTestController.expectOne(`https://api.escuelajs.co/api/v1/products/${productId}`);
      req.flush(msgError, mockError);

      expect(req.request.method).toEqual('GET');
    });

    it('should return the right message when status code is 401', (doneFn) => {
      // Arrange
      const productId = 2;
      const msgError = 'No autorizado';
      const mockError = {
        status: HttpStatusCode.Unauthorized, // 401
        statusText: msgError,
      }

      // Act
      productService.getOne(productId).subscribe({
        next: (updatedProduct) => {
          // Assert
          // expect(updatedProduct).toEqual(mockData);
          // doneFn();
        },
        error: (error) => {
          // Assert
          expect(error).toEqual(msgError);
          doneFn();
        }
      });

      // http config
      const req = httpTestController.expectOne(`https://api.escuelajs.co/api/v1/products/${productId}`);
      req.flush(msgError, mockError);

      expect(req.request.method).toEqual('GET');
    });

    it('should return the right message when status code is 500', (doneFn) => {
      // Arrange
      const productId = 2;
      const msgError = 'Ups algo salio mal';
      const mockError = {
        status: HttpStatusCode.InternalServerError, // 500
        statusText: msgError,
      }

      // Act
      productService.getOne(productId).subscribe({
        next: (updatedProduct) => {
          // Assert
          // expect(updatedProduct).toEqual(mockData);
          // doneFn();
        },
        error: (error) => {
          // Assert
          expect(error).toEqual(msgError);
          doneFn();
        }
      });

      // http config
      const req = httpTestController.expectOne(`https://api.escuelajs.co/api/v1/products/${productId}`);
      req.flush(msgError, mockError);

      expect(req.request.method).toEqual('GET');
    });
  });
});
