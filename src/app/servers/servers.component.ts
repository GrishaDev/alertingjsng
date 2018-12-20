import { Component, OnInit,Inject,ViewChild } from '@angular/core';
import {MatDialog,MAT_DIALOG_DATA,MatDialogRef,MatPaginator,MatTableDataSource} from '@angular/material';
import { ServerdialogComponent } from '../serverdialog/serverdialog.component';

export interface DialogData {
  mails: string;
  index:number
}

export interface Server {
  server: string;
  cpu: string;
  ram: string;
  overloaded: string
  mail: string;
}


let SERVER_DATA: Server[] = [
  {server: 'harta', cpu: "92%",ram:"52%",overloaded:"true",mail:"dada@gmail.com,pringles@hey.com"},
  {server: 'harta2', cpu: "22%",ram:"12%",overloaded:"false",mail:"pringles@hey.com"},
  {server: 'harta3', cpu: "62%",ram:"42%",overloaded:"false",mail:"banan@outlook.com,jaja@bueno.nz"},
];

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  displayedColumns: string[] = ['server', 'cpu','ram','overloaded','mail'];
 // dataSource = SERVER_DATA;
 dataSource = new MatTableDataSource<Server>(SERVER_DATA);
 

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

 // mails:string;

  constructor(public dialog: MatDialog) { }

 

  openDialog(server,mails,index): void {
    const dialogRef = this.dialog.open(ServerdialogComponent, {
      width: '450px',
      height: '250px',
      data: {server:server,mails: mails,index:index}
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(`The dialog was closed ${result}`);
      console.log(result);
       //this.newmails = result;
      if(result)
      SERVER_DATA[result.index].mail = result.mails;
      //  console.log(result);
      //  console.log(this.newmails);
    });
  }

}



// @Component({
//   selector: 'field',
//   templateUrl: 'field.html',
// })
// export class Field {
//   constructor(public dialogRef: MatDialogRef<Field>,@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }
// }