import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { ProductComponent } from '../product/product.component';
import { ProductService } from '../../services/product.service';
import { generateManyProducts } from '../../models/product.mock';
import { of } from 'rxjs';

fdescribe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: jasmine.SpyObj<ProductService>

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getAllProducts']);

    await TestBed.configureTestingModule({
      imports: [ProductsComponent, ProductComponent],
      providers: [
        {
          provide: ProductService,
          useValue: productServiceSpy
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;

    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>; // se obtiene el servicio como un spy
  });

  it('should create', () => {
    const productsMock = generateManyProducts(3);
    productService.getAllProducts.and.returnValue(of(productsMock)); // se configura el spy para que retorne un valor específico

    fixture.detectChanges(); // se ejecuta el ngOnInit

    expect(component).toBeTruthy();
    expect(productService.getAllProducts).toHaveBeenCalled();
  });
});
