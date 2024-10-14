import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateProductDTO, Product } from '../models/product.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  constructor() {}

  getProductsSimple() {
    return this.http.get<Product[]>('https://api.escuelajs.co/api/v1/products');
  }

  // hay que poner el tipo de retorno de forma explicita ya que con las modificaciones que se hicieron en el map, el tipo de retorno no es el mismo que el de la peticion
  getAllProducts(limit?: number, offset?: number): Observable<Product[]> {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit.toString());
      params = params.set('offset', offset.toString());
    }
    return this.http.get<Product[]>('https://api.escuelajs.co/api/v1/products', { params })
      .pipe(
        map(products => products.map(product => ({
          ...product,
          taxes: product.price > 0 ? 0.19 * product.price : 0,
        })))
      );
  }

  getProductsByCategory(category_id?: string) {
    const url = new URL('https://api.escuelajs.co/api/v1/products');
    if (category_id) {
      url.searchParams.set('categoryId', category_id);
    }
    return this.http
      .get<Product[]>(url.toString())
      .pipe(
        map((products) =>
          products.map((product) => ({
            ...product,
            images: product.images.map((image) =>
              this.cleanAndParseImageUrl(image)
            ),
          }))
        )
      );
  }

  getOne(id: string) {
    return this.http
      .get<Product>(`https://api.escuelajs.co/api/v1/products/${id}`)
      .pipe(
        map((product) => {
          return {
            ...product,
            images: product.images.map((image) =>
              this.cleanAndParseImageUrl(image)
            ),
          };
        })
      );
  }

  private cleanAndParseImageUrl(image: string): string {
    // ["https://static.india.com/wp-content/uploads/2020/05/table-tennis.jpg?impolicy=Medium_Widthonly&w=700"]
    let cleanedImage = image.replace(/^\["?|"?]$/g, '');
    try {
      cleanedImage = JSON.parse(cleanedImage);
    } catch (error) {
      //
    }
    return cleanedImage;
  }

  create(product: CreateProductDTO) {
    // product.title = 'New product'; // esta mutacion se puede evitar si se usa el utility type Readonly y tambien se puede testear que lo que se envia como argumento pase igual a la petición
    return this.http.post<Product>('https://api.escuelajs.co/api/v1/products', product);
  }
}
