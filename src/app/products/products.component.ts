import { Component, OnInit } from '@angular/core';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  // selectedProduct: Product;

  products: Product[];

  constructor(private productService: ProductService, private  messageService: MessageService) { 
    
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts()
    .subscribe(products => this.products = products);
  }

  add(name: string): void {
    // name = name.trim();
    if(!name) { return; }
    
    this.productService.addProduct({ name } as Product)
    .subscribe(product => {
      this.products.push(product);
    });

  }

  delete(product: Product): void {
    this.products = this.products.filter(p => p != product);
    this.productService.deleteProduct(product).subscribe();
  } 

  // onSelect(product: Product): void {
  //   this.selectedProduct = product;
  //   this.messageService.add(`ProductsComponent: Selected product id=${product.id}`);
  // }

}
