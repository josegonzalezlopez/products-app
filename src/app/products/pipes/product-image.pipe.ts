import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Pipe({
  name: 'productImage'
})
export class ProductImagePipe implements PipeTransform {

  transform(product: Product): string {
    if(!product.id && !product.altImage){
      return 'assets/noProductImage.jpg';
    }

    return `assets/products/${product.id}.jpg`;
  }

}
