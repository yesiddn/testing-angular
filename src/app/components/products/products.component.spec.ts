import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { ProductComponent } from '../product/product.component';
import { ProductService } from '../../services/product.service';
import { generateManyProducts } from '../../models/product.mock';
import { defer, of } from 'rxjs';
import { ValueService } from '../../services/value.service';
import { By } from '@angular/platform-browser';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: jasmine.SpyObj<ProductService>
  let valueService: jasmine.SpyObj<ValueService>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getAllProducts']);
    const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getPromiseValue']);

    await TestBed.configureTestingModule({
      imports: [ProductsComponent, ProductComponent],
      providers: [
        {
          provide: ProductService,
          useValue: productServiceSpy
        },
        {
          provide: ValueService,
          useValue: valueServiceSpy
        },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;

    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>; // se obtiene el servicio como un spy
    valueService = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
    const productsMock = generateManyProducts(3);
    productService.getAllProducts.and.returnValue(of(productsMock)); // se configura el spy para que retorne un valor específico

    fixture.detectChanges(); // se ejecuta el ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(productService.getAllProducts).toHaveBeenCalled();
  });

  describe('tests for getAllProducts', () => {
    it('should return product list from service', () => {
      // Arrange
      const productsMock = generateManyProducts(3);
      productService.getAllProducts.and.returnValue(of(productsMock));
      const prevCount = component.products.length;

      // Act
      component.getAllProducts();
      fixture.detectChanges();

      // Assert
      // TODO: tests for render products
      expect(component.products.length).toBe(productsMock.length + prevCount);
    });

    it('should change the status "loading" => "success"', fakeAsync(() => { // se usa fakeAsync para poder controlar el tiempo de ejecución
      // Arrange
      const productsMock = generateManyProducts(10);
      productService.getAllProducts.and.returnValue(defer(() => Promise.resolve(productsMock))); // defer es una función que emula un tipo de asincronía de forma que tarda en devolver la respuesta

      // Act
      component.getAllProducts();
      fixture.detectChanges();

      expect(component.status).toBe('loading');

      tick(); // se ejecuta todo el código asincrónico que este pendiente -> obs, promise, setTimeout
      // tick(4000); // se puede pasar un tiempo en milisegundos para simular un tiempo de espera
      fixture.detectChanges(); // despues del tick se debe ejecutar el detectChanges para que se actualice la vista
      // Assert
      expect(component.status).toBe('success');
    }));
  });

  describe('tests for callPromise', () => {
    it('should call to promise', async () => {
      // Arrange
      const mockMsg = 'promise value';
      valueService.getPromiseValue.and.returnValue(Promise.resolve(mockMsg));

      // Act
      // con promesar se puede usar async/await o fakeAsync/tick
      await component.callPromise();
      fixture.detectChanges();

      // Assert
      expect(component.promiseResponse).toBe(mockMsg);
      expect(valueService.getPromiseValue).toHaveBeenCalled();
    });

    it('should show "promise value" in <p> when btn was clicked', fakeAsync(() => {
      // Arrange
      const mockMsg = 'promise value';
      valueService.getPromiseValue.and.returnValue(Promise.resolve(mockMsg));
      const btnDe = fixture.debugElement.query(By.css('.btn-promise'));

      // Act
      // para este caso en el que no controlamos el tiempo de ejecución con async/await, se usa fakeAsync/tick
      btnDe.triggerEventHandler('click', null);
      tick();
      fixture.detectChanges();
      const pDe = fixture.debugElement.query(By.css('p.promise-response'));

      // Assert
      expect(component.promiseResponse).toBe(mockMsg);
      expect(valueService.getPromiseValue).toHaveBeenCalled();
      expect(pDe.nativeElement.textContent).toContain(mockMsg);
    }));
  });
});
