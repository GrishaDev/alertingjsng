import { Component,Inject } from '@angular/core';
import {MatDialog,MAT_DIALOG_DATA,MatDialogRef} from '@angular/material';

export interface DialogData {
  server: string;
  index:number;
  group:string;
}

@Component({
  selector: 'app-groupdialog',
  templateUrl: './groupdialog.component.html',
  styleUrls: ['./groupdialog.component.css']
})
export class GroupdialogComponent {

  ngOnInit() {
  }
  constructor(public dialogRef: MatDialogRef<GroupdialogComponent>,@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
