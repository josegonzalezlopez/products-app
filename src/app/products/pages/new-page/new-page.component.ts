import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from '../../services/products.service';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent {

public productForm = new FormGroup({
  id: new FormControl<string>(''),
  name: new FormControl<string>('', {nonNullable: true}),
  manufacturer: new FormControl<string>(''),
  color: new FormControl<string>(''),
  energyEfficiency: new FormControl<string>(''),
  descripcion: new FormControl<string>(''),
  altImage: new FormControl<string>(''),
});

constructor(private productService: ProductService){}

get currentProduct(): Product{
  const product = this.productForm.value as Product;

  return product;
}


onSubmit(): void{
  console.log(this.productForm.valid);
  
}

}
