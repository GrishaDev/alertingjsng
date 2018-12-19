import { Component,Inject } from '@angular/core';
import {MatDialog,MAT_DIALOG_DATA,MatDialogRef} from '@angular/material';

export interface DialogData {
  value: string;
  index:number
}

@Component({
  selector: 'app-settingdialog',
  templateUrl: './settingdialog.component.html',
  styleUrls: ['./settingdialog.component.css']
})
export class SettingdialogComponent {

  constructor(public dialogRef: MatDialogRef<SettingdialogComponent >,@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
