import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileHandle } from '../_model/file-handle.model';

@Component({
  selector: 'app-show-product-images-dialog',
  templateUrl: './show-product-images-dialog.component.html',
  styleUrls: ['./show-product-images-dialog.component.scss']
})
export class ShowProductImagesDialogComponent {

  constructor (
    @Inject (MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit () {
    this.recieveImages();
  }

  recieveImages() {
    console.log(this.data);
  }

}
