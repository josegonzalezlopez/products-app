import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/products.service';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit{

  public productList: Product[] = [];

  constructor(private productService: ProductService){ }
  
  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: response =>{
          this.productList = response;
      }
    })
  }

}
