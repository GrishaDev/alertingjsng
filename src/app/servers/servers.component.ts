import { Component, OnInit,Inject,ViewChild } from '@angular/core';
import {MatDialog,MAT_DIALOG_DATA,MatDialogRef,MatPaginator,MatTableDataSource} from '@angular/material';
import { ServerdialogComponent } from '../serverdialog/serverdialog.component';
import { ServersService } from './servers.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

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
  styleUrls: ['./servers.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('500ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
      animate('500ms ease-in', style({transform: 'translateX(0%)'}))
      ])
    ])
  ]
})
export class ServersComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public dialog: MatDialog,private serversapi:ServersService) { }

  displayedColumns: string[] = ['server', 'cpu','ram','overloaded','mail'];
 // dataSource = SERVER_DATA;
 dataSource = new MatTableDataSource<Server>(SERVER_DATA);
  loading:boolean = false;

  first:boolean = true;

 animation = false;
  ngOnInit() 
  {
    this.animation = true;
    this.dataSource.paginator = this.paginator;
    this.updateTable();
    this.first=false;
  }

 // mails:string;


  updateTable()
  {
    if(!this.first)
    this.loading = true;

    this.serversapi.getServers().subscribe((data:any) =>
      {
        SERVER_DATA = data;
        SERVER_DATA.sort(function(a, b) {
          return a.id - b.id;
        });
        this.dataSource = new MatTableDataSource<Server>(SERVER_DATA);
        this.dataSource.paginator = this.paginator;
        console.log("got new server data");

         setTimeout(function() { console.log("stop loading show"); this.loading=false;}.bind(this), 500);
        //this.loading = false;
        console.log(SERVER_DATA);
      });
  }
  
  // stopLoading()
  // {
  //   this.loading=false;
  //   console.log(this.loading);
  // }
  updateServers(data)
  {
    //let finaldata = this.parsemaildata(data);
    this.serversapi.postsmails(data).subscribe((res:any) =>
      {
         if(res.status)
         {
            console.log("succesful servers update!");
         }
         else
         {
            console.log("failed servers update.");
         }
      });
  }

  parsemaildata(data)
  {
    let maildata = [];

    for(let i=0; i<data.length;i++)
    {
      maildata.push({server:data[i].server,mail:data[i].mail})
    }
    return maildata;
  }
  openDialog(server,mails,index): void {
    const dialogRef = this.dialog.open(ServerdialogComponent, {
      width: '450px',
      data: {server:server,mails: mails,index:index}
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(`The dialog was closed ${result}`);
      console.log(result);
       //this.newmails = result;
      if(result)
      {
        SERVER_DATA[result.index].mail = result.mails;
        this.updateServers({server:SERVER_DATA[result.index].server,mail:SERVER_DATA[result.index].mail});

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