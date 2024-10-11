import { TestBed } from "@angular/core/testing";
import { ProductService } from "./product.service";
import { HttpClientModule, provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { Product } from "../models/product.mode";
import { generateManyProducts } from "../models/product.mock";

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

      httpTestController.verify(); // verifica que no haya mas peticiones pendientes y que se hayan respondido todas
    });
  });
});
