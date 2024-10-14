import { Category } from "./category.model";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  createdAt: string;
  category: Category;
  taxes?: number;
}

export interface CreateProductDTO extends Omit<Product, 'id' | 'createdAt' | 'category'> {
  categoryId: number;
}
