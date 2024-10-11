import { faker } from '@faker-js/faker';
import { Product } from './product.mode';

export const generateOneProduct = (): Product => {
  return {
    id: faker.number.int(),
    title: faker.commerce.productName(),
    price: parseInt(faker.commerce.price()),
    description: faker.commerce.productDescription(),
    images: [
      faker.image.url(),
      faker.image.url(),
    ],
    category: {
      id: faker.number.int(),
      name: faker.commerce.department(),
      image: faker.image.url(),
    },
    createdAt: faker.date.recent().toDateString(),
  }
}

export const generateManyProducts = (count = 10): Product[] => {
  const products: Product[] = [];
  for (let i = 0; i < count; i++) {
    products.push(generateOneProduct());
  }
  return [...products];
}
