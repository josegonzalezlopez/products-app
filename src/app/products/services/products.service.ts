import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product.interface';
import { Observable, catchError, of } from 'rxjs';
import { environments } from 'src/environments/environments';

@Injectable({providedIn: 'root'})
export class ProductService {

    private baseUrl: string = environments.baseUrl;

    constructor(private httpClient: HttpClient) { }
    
    getProducts(): Observable<Product[]>{
        return this.httpClient.get<Product[]>(`${this.baseUrl}/products`)
    }

    getProductById(id: string): Observable<Product | undefined>{
        return this.httpClient.get<Product>(`${this.baseUrl}/products/${id}`)
        .pipe(
            catchError(error => of(undefined))
        );
    }

    getSuggestions( query: string): Observable<Product[]>{
        return this.httpClient.get<Product[]>(`${this.baseUrl}/products?q=${query}&_limit=5`);
    }

    addProduct(product: Product): Observable<Product>{  
        return this.httpClient.post<Product>(`${this.baseUrl}/products`, product);
    }

    updateProduct(product: Product): Observable<Product>{
        if(!product.id) throw Error('Product Id is required');

        return this.httpClient.put<Product>(`${this.baseUrl}/products/${product.id}`, product);
    }

    deleteProduct(productId: string): Observable<Object>{
        return this.httpClient.delete(`${this.baseUrl}/products/${productId}`);
    }
}