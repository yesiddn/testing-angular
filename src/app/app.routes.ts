import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { PicoPreviewComponent } from './components/pico-preview/pico-preview.component';
import { PersonComponent } from './components/person/person.component';

export const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'pico-preview',
    component: PicoPreviewComponent
  },
  {
    path: 'person',
    component: PersonComponent
  }
];
