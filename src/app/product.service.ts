import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Product } from './product';
import { PRODUCTS } from './mock-products';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getProducts(): Observable<Product[]> {
    this.messageService.add("ProductService: fetched products");
    return this.http.get<Product[]>(this.productsUrl)
    .pipe(catchError(this.handleError<Product[]>('getProducts', [])));
  }

  getProduct(id: number): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => this.log(`fetched product id=${id}`)),
      catchError(this.handleError<Product>(`getHero id=${id}`))
    );
  }

  updateProduct(product: Product): Observable<any> {
    const url = `${this.productsUrl}/${product.id}`;
    return this.http.put(url, product, this.httpOptions).pipe(
      tap(_ => this.log(`updated product id=${product.id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, product, this.httpOptions).pipe(
      tap((newProduct: Product) => this.log(`added product w/ id=${newProduct.id}`)),
      catchError(this.handleError<Product>('addProduct'))
    );
  }

  deleteProduct(product: Product | number): Observable<Product> {
    const id = typeof product === 'number' ? product : product.id;
    const url = `${this.productsUrl}/${id}`;

    return this.http.delete<Product>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted product id=${id}`)),
      catchError(this.handleError<Product>('deleteProduct'))
    );
  }

  //route: /api/products/?name=term
  searchProducts(term: string): Observable<Product[]> {
    if(!term.trim()) {
      //return empty array
      return of([]);
    }

    return this.http.get<Product[]>(`${this.productsUrl}/?name=${term}`).pipe(
      tap(x => x.length ? this.log(`found products matching ${term}`) :
      this.log(`no products matching ${term}`)),
      catchError(this.handleError<Product[]>('searchProducts', []))
    );
  }

  private log(message: string) {
    this.messageService.add(`ProductService: ${message}`);
  }

  private productsUrl = 'https://localhost:5001/api/products'; //URL to web api

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */

 private handleError<T>(operation = 'operation', result?: T) {
   return (error: any): Observable<T> => {
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
   }
 }

  // genId(products: Product[]): number {
  //   return products.length > 0 ? Math.max(...products.map(product => product.id)) + 1 : 11;
  // }
}
