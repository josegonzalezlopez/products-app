import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ProductService } from '../../services/products.service';
import { Product } from '../../interfaces/product.interface';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit {

  public productForm = new FormGroup({
    id: new FormControl<string>(''),
    name: new FormControl<string>('', {nonNullable: true}),
    manufacturer: new FormControl<string>(''),
    color: new FormControl<string>(''),
    energyEfficiency: new FormControl<string>(''),
    descripcion: new FormControl<string>(''),
    altImage: new FormControl<string>(''),
  });

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar){}

  ngOnInit(): void {
    if( this.router.url.includes('edit')){
      this.activatedRoute.params
      .pipe(
        switchMap( ({ id })=>  this.productService.getProductById(id))
      )
      .subscribe({
        next: response=>{
          if (!response) return this.router.navigateByUrl('');
          return this.productForm.patchValue(response);
        }
      });
    }
    
  }

  get currentProduct(): Product{
    const product = this.productForm.value as Product;

    return product;
  }

  onSubmit(): void{
    if (this.productForm.invalid) return;

    if( this.currentProduct.id ){
      this.productService.updateProduct( this.currentProduct ).subscribe({
        next: response=>{
          this.showSnackbar( `${response.name} updated!` );
        }
      });
      return;
    }

    this.productService.addProduct( this.currentProduct ).subscribe({
      next: response=> {
        this.showSnackbar( `${response} Created!!` )
        this.router.navigate(['/products/edit', response.id])
      }
    })

  }

  showSnackbar(message: string){
    this.snackBar.open( message, undefined, {
      duration: 2500,
    } );
  }

}
