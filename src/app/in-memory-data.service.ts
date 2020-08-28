import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const products = [
      { id: 11, name: 'Product-1' },
      { id: 12, name: 'Product-2' },
      { id: 13, name: 'Product-3' },
      { id: 14, name: 'Product-4' },
      { id: 15, name: 'Product-5' },
      { id: 16, name: 'Product-6' },
      { id: 17, name: 'Product-7' },
      { id: 18, name: 'Product-8' },
      { id: 19, name: 'Product-9' },
      { id: 20, name: 'Product-10' }
    ];

    return {products};
  }
  
  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(products: Product[]): number {
    return products.length > 0 ? Math.max(...products.map(product => product.id)) + 1 : 11;
  }
}
