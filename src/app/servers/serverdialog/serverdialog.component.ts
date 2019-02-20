import { Component,Inject } from '@angular/core';
import {MatDialog,MAT_DIALOG_DATA,MatDialogRef} from '@angular/material';

export interface DialogData {
  server: string;
  mails: string;
  index:number;
}

@Component({
  selector: 'app-serverdialog',
  templateUrl: './serverdialog.component.html',
  styleUrls: ['./serverdialog.component.css']
})

export class ServerdialogComponent {
  constructor(public dialogRef: MatDialogRef<ServerdialogComponent>,@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

//public dialogRef: MatDialogRef<Field>,@Inject(MAT_DIALOG_DATA) public data: DialogData