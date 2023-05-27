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
}