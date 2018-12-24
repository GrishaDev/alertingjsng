import { Component, OnInit,Inject,ViewChild } from '@angular/core';
import {MatDialog,MAT_DIALOG_DATA,MatDialogRef,MatPaginator,MatTableDataSource} from '@angular/material';
import { ServerdialogComponent } from '../serverdialog/serverdialog.component';
import { ServersService } from './servers.service';

export interface DialogData {
  mails: string;
  index:number
}

export interface Server {
  id: number,
  server: string;
  cpu: string;
  ram: string;
  overloaded: string
  mail: string;
}


let SERVER_DATA: Server[] = [
  {id: 0,server: 'harta', cpu: "92%",ram:"52%",overloaded:"true",mail:"dada@gmail.com,pringles@hey.com"},
  {id: 1,server: 'harta2', cpu: "22%",ram:"12%",overloaded:"false",mail:"pringles@hey.com"},
  {id: 2,server: 'harta3', cpu: "62%",ram:"42%",overloaded:"false",mail:"banan@outlook.com,jaja@bueno.nz"},
  {id: 3,server: 'harta324', cpu: "92%",ram:"52%",overloaded:"true",mail:"dada@gmail.com,pringles@hey.com"},
  {id: 4,server: 'harta211', cpu: "22%",ram:"12%",overloaded:"false",mail:"pringles@hey.com"},
  {id: 5,server: 'harta324', cpu: "62%",ram:"42%",overloaded:"false",mail:"banan@outlook.com,jaja@bueno.nz"},
  {id: 6,server: 'harta342', cpu: "92%",ram:"52%",overloaded:"true",mail:"dada@gmail.com,pringles@hey.com"},
  {id: 7,server: 'harta234', cpu: "22%",ram:"12%",overloaded:"false",mail:"pringles@hey.com"},
  {id: 8,server: 'harta337', cpu: "62%",ram:"42%",overloaded:"false",mail:"banan@outlook.com,jaja@bueno.nz"},
  {id: 9,server: 'harta', cpu: "92%",ram:"52%",overloaded:"true",mail:"dada@gmail.com,pringles@hey.com"},
  {id: 10,server: 'harta777', cpu: "22%",ram:"12%",overloaded:"false",mail:"pringles@hey.com"},
  {id: 11,server: 'harta3', cpu: "62%",ram:"42%",overloaded:"false",mail:"banan@outlook.com,jaja@bueno.nz"},
  {id: 12,server: 'harta324', cpu: "92%",ram:"52%",overloaded:"true",mail:"dada@gmail.com,pringles@hey.com"},
  {id: 13,server: 'harta555', cpu: "22%",ram:"12%",overloaded:"false",mail:"pringles@hey.com"},
  {id: 14,server: 'harta322', cpu: "62%",ram:"42%",overloaded:"false",mail:"banan@outlook.com,jaja@bueno.nz"}
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

  ngOnInit() 
  {
    this.dataSource.paginator = this.paginator;
    this.updateTable();
  }

 // mails:string;

  constructor(public dialog: MatDialog,private serversapi:ServersService) { }


  updateTable()
  {
    this.serversapi.getServers().subscribe((data:any) =>
      {
        for(let i=0; i<data.length;i++)
        {
          console.log(data);
          let index = data[i].id
          console.log(index);
          SERVER_DATA[i].server = data[index].server;
          SERVER_DATA[i].cpu = data[index].cpu;
          SERVER_DATA[i].ram = data[index].ram;
          SERVER_DATA[i].overloaded = data[index].overloaded;
          SERVER_DATA[i].mail = data[index].mail;
        }
      });
  }
  
  updateServers(data)
  {
    this.serversapi.postservers(data).subscribe((res:any) =>
      {
         if(res.status)
         {
            console.log("succesful settings update!");
         }
         else
         {
            console.log("failed settings update.");
         }
      });
  }

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
      {
        SERVER_DATA[result.index].mail = result.mails;
        this.updateServers(SERVER_DATA);

      }
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