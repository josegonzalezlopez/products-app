import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/products.service';
import { FormControl } from '@angular/forms';
import { Product } from '../../interfaces/product.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {

  public searchInput: FormControl = new FormControl('');
  public productList: Product[] = [];
  public selectProduct?: Product = undefined;

  constructor(private productService: ProductService){}

  searchProduct(){
    const value: string = this.searchInput.value || '';

    this.productService.getSuggestions( value ).subscribe( products => this.productList = products);
  }
    
  onSelectedOption(event: MatAutocompleteSelectedEvent){
    if(!event.option.value){
      this.selectProduct = undefined;
      return;
    }
    const product: Product = event.option.value;
    this.searchInput.setValue(product.name)

    this.selectProduct = product;
  }
    

}
