import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  private productService = inject(ProductService);
  products: Product[] = [];
  limit = 10;
  offset = 0;
  status: 'loading' | 'success' | 'error' | 'init' = 'init';

  ngOnInit() {
    console.log(this.status === 'init');
    this.getAllProducts();
  }

  getAllProducts() {
    this.status = 'loading';
    this.productService.getAllProducts(this.limit, this.offset).subscribe({
      next: (products) => {
        this.products = products;
        this.offset += this.limit;
        this.status = 'success';
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }
}
