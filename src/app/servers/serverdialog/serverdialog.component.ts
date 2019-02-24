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

  good:boolean = false;
  errormsg:string = '';

  onNoClick(): void {
    this.dialogRef.close();
  }

  valid(str:string)
  {
    let list = str.split(",");
    // console.log(list);

    for(let i=0; i<list.length;i++)
    {
      if(!this.validmail(list[i]))
      {
        this.good = false;
        // console.log(this.good);
        this.errormsg = 'Not a mail or mail list.';
        return;
        // return false;
      }
    }
    this.good = true;
    // console.log(this.good);
    this.errormsg = '';
  }

  validmail(str:string)
  {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(str);
  }

  // getColor()
  // {
  //   if(this.good)
  //     return primary;
  //   else
  //     return "warn";
  // }
}

//public dialogRef: MatDialogRef<Field>,@Inject(MAT_DIALOG_DATA) public data: DialogData