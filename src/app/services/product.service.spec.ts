import { TestBed } from "@angular/core/testing";
import { ProductService } from "./product.service";
import { HttpClientModule, provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { Product } from "../models/product.mode";

fdescribe('ProductService', () => {
  let productService: ProductService;
  let httpTestController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], // sin el import de HttpClient, el test falla, pero hay un modulo de testing que se llama HttpClientTestingModule
      // https://angular.dev/guide/http/testing
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });

    httpTestController = TestBed.inject(HttpTestingController);
    productService = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  describe('tests for getProductsSimple', () => {
    it('should return a product list', () => {
      // Arrange
      const mockProducts: Product[] = [
        {
          id: 1,
          title: 'Product 1',
          price: 100,
          description: 'Description 1',
          images: ['image1.jpg'],
          category: {
            id: 1,
            name: 'Category 1',
            image: 'category1.jpg',
          },
          createdAt: '2021-01-01',
        },
      ];

      // Act
      productService.getProductsSimple().subscribe((products) => {
        expect(products.length).toEqual(mockProducts.length);
        expect(products).toEqual(mockProducts);
      });

      // http config
      const req = httpTestController.expectOne('https://api.escuelajs.co/api/v1/products'); // se espera una peticion a esa url
      req.flush(mockProducts); // se responde con los productos mockeados

      httpTestController.verify(); // verifica que no haya mas peticiones pendientes y que se hayan respondido todas
    });
  });
});
