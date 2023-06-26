import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'product-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styles: [
  ]
})
export class ConfirmDialogComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Product){}

  onDialogClose(){
    this.dialogRef.close(false);
  }

  onConfirm(){
    this.dialogRef.close(true)
  }
}
