import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styles: [
  ]
})
export class ProductPageComponent implements OnInit {
  
  public product?: Product;

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private router: Router){}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id })=> this.productService.getProductById(id))
      )
      .subscribe({
        next:(product)=>{
          if(!product) return this.router.navigate(['/products/list']);

          console.log(product);

          return this.product = product
        }
      });
  }

  goBack(): void{
    this.router.navigate(['/products/list']);
  }
}
