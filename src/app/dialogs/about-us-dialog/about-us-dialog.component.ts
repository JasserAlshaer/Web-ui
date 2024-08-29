import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-about-us-dialog',
  templateUrl: './about-us-dialog.component.html',
  styleUrls: ['./about-us-dialog.component.css']
})
export class AboutUsDialogComponent {
  constructor(public dialogRef: MatDialogRef<AboutUsDialogComponent>) {}

  close() {
    this.dialogRef.close();
  }
}
