import { Component, OnInit,Inject,ViewChild } from '@angular/core';
import {MatDialog,MAT_DIALOG_DATA,MatDialogRef,MatPaginator,MatTableDataSource} from '@angular/material';
import { ServerdialogComponent } from '../serverdialog/serverdialog.component';
import { GroupdialogComponent } from '../groupdialog/groupdialog.component';
import { ServersService } from './servers.service';
import { SettingsService } from '../settings.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

export interface DialogData {
  mails: string;
  index:number
}

export interface Server {
  id: number,
  group: string,
  server: string,
  cpu: number,
  ram: number,
  overloaded: boolean,
  mail: string;
}


let SERVER_DATA2: Server[] = [
  {id: 0,group:"group1",server: 'harta', cpu: 92,ram:52,overloaded:true,mail:"dada@gmail.com,pringles@hey.com,dada@gmail.com,pringles@hey.com,dada@gmail.com,pringles@hey.com,dada@gmail.com,pringles@hey.com,dada@gmail.com,pringles@hey.com,"+
  "dada@gmail.com,pringles@hey.com,dada@gmail.com,pringles@hey.com,dada@gmail.com,pringles@hey.com,dada@gmail.com,pringles@hey.com,dada@gmail.com,pringles@hey.com"},
  {id: 1,group:"group1",server: 'harta2', cpu: 22,ram:12,overloaded:false,mail:"pringles@hey.com"},
  {id: 2,group:"group1",server: 'harta3', cpu: 62,ram:42,overloaded:false,mail:"banan@outlook.com,jaja@bueno.nz"},
  {id: 3,group:"group1",server: 'harta324', cpu: 92,ram:52,overloaded:true,mail:"dada@gmail.com,pringles@hey.com"},
  {id: 4,group:"group1",server: 'harta211', cpu: 22,ram:12,overloaded:false,mail:"pringles@hey.com"} ];

let SERVER_DATA: Server[] = [
  {id: 0,group:"group1",server: 'harta', cpu: 92,ram:52,overloaded:true,mail:"dada@gmail.com,pringles@hey.com,dada@gmail.com,pringles@hey.com,dada@gmail.com,pringles@hey.com,dada@gmail.com,pringles@hey.com,dada@gmail.com,pringles@hey.com,"+
  "dada@gmail.com,pringles@hey.com,dada@gmail.com,pringles@hey.com,dada@gmail.com,pringles@hey.com,dada@gmail.com,pringles@hey.com,dada@gmail.com,pringles@hey.com"},
  {id: 1,group:"group1",server: 'harta2', cpu: 22,ram:12,overloaded:false,mail:"pringles@hey.com"},
  {id: 2,group:"group1",server: 'harta3', cpu: 62,ram:42,overloaded:false,mail:"banan@outlook.com,jaja@bueno.nz"},
  {id: 3,group:"group1",server: 'harta324', cpu: 92,ram:52,overloaded:true,mail:"dada@gmail.com,pringles@hey.com"},
  {id: 4,group:"group1",server: 'harta211', cpu: 22,ram:12,overloaded:false,mail:"pringles@hey.com"},
  {id: 5,group:"group1",server: 'harta324', cpu: 62,ram:42,overloaded:false,mail:"banan@outlook.com,jaja@bueno.nz"},
  {id: 6,group:"group1",server: 'harta342', cpu: 92,ram:52,overloaded:true,mail:"dada@gmail.com,pringles@hey.com"},
  {id: 7,group:"group1",server: 'harta234', cpu: 22,ram:12,overloaded:false,mail:"pringles@hey.com"},
  {id: 8,group:"group1",server: 'harta337', cpu: 62,ram:42,overloaded:false,mail:"banan@outlook.com,jaja@bueno.nz"},
  {id: 9,group:"group1",server: 'harta', cpu: 92,ram:52,overloaded:true,mail:"dada@gmail.com,pringles@hey.com"},
  {id: 10,group:"group1",server: 'harta777', cpu: 22,ram:12,overloaded:false,mail:"pringles@hey.com"},
  {id: 11,group:"group1",server: 'harta3', cpu: 62,ram:42,overloaded:false,mail:"banan@outlook.com,jaja@bueno.nz"},
  {id: 12,group:"group1",server: 'harta324', cpu: 92,ram:52,overloaded:true,mail:"dada@gmail.com,pringles@hey.com"},
  {id: 13,group:"group1",server: 'harta555', cpu: 22,ram:12,overloaded:false,mail:"pringles@hey.com"},
  {id: 14,group:"group1",server: 'harta322', cpu: 62,ram:42,overloaded:false,mail:"banan@outlook.com,jaja@bueno.nz"}
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
export class ServersComponent implements OnInit 
{
  displayedColumns: string[] = ['group','server', 'cpu','ram','overloaded','mail'];
  filters: string [] = [];
  dataSource;
  loading:boolean = false;

  first:boolean = true;
  yea:boolean = true;
  peak:number = 200;
  errormsg:string = "";

  animation = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog,private serversapi:ServersService,private settingsapi:SettingsService) { }

  ngOnInit() 
  {
    this.animation = true;

    this.dataSource  = new MatTableDataSource<Server>(SERVER_DATA);
    setTimeout(() => this.dataSource.paginator = this.paginator);

    // setTimeout(function(){this.dataSource.paginator = this.paginator;},1000);
    this.updateTable();
    this.first=false;
  }

  updateTable()
  {
    if(!this.first)
    this.loading = true;

    this.makeFilters();
  
    this.serversapi.getServers().subscribe((data:any) =>
    {
      SERVER_DATA = data;
      SERVER_DATA.sort(function(a, b) {
        return a.id - b.id;
      });
      this.getPeakValue();
      this.dataSource = new MatTableDataSource<Server>(SERVER_DATA);
      this.dataSource.paginator = this.paginator;
      this.errormsg= "";
      console.log("got new server data");
      setTimeout(function() {this.loading=false;}.bind(this), 500);
    },
    (err) => {console.log("Error contacting servers service, server down? details: "+JSON.stringify(err));
    this.errormsg="Error getting data from database, try again soon.";
    this.loading=false;});
  }
  
  makeFilters()
  {
    let group:string;

    for(let i=0;i<SERVER_DATA.length;i++)
    {
      group = SERVER_DATA[i].group;
      // for(let j=0; j<this.filters.length;j++)
      // {
      //   if(group != this.filters[j])
      //   {
      //     this.filters.push(group);
      //   }
      // }
      if(this.filters.indexOf(group) === -1)
      {
        this.filters.push(group);
      }
    }

    console.log("gwagwagwagwagwagwagwagw");
    console.log(this.filters);
  }
  getPeakValue()
  {
    this.settingsapi.getSettings().subscribe((data:any) =>
    {
      for(let i=0;i<data.length;i++)
      {
        if(data[i].name=="peak")
        {
          let str = data[i].value;
          let cropped = str.slice(0,str.length-1)
          this.peak = Number(cropped);
          console.log(this.peak);
        }
      }
    },
    (err) => {console.log("Error contacting settings service, server down? details: "+JSON.stringify(err));
    this.errormsg="Error getting some data from database, but overall ok"});
  }

  updateServers(data)
  {
    this.makeFilters();
    this.serversapi.postsmails(data).subscribe((res:any) =>
    {
        if(res.status)
        {
          // this.updateTable();
          console.log("succesful servers update!");
        }
        else
        {
          console.log("failed servers update.");
          this.errormsg="Error getting data from database, try again soon."
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

  openDialog(server,mails,index): void 
  {
    console.log(server+" "+mails+" "+index);
    const dialogRef = this.dialog.open(ServerdialogComponent, 
    {
      width: '450px',
      data: {server:server,mails: mails,index:index}
    });

    dialogRef.afterClosed().subscribe(result => 
    {
      console.log(result);
      if(result)
      {
        SERVER_DATA[result.index].mail = result.mails;
        this.updateServers({server:SERVER_DATA[result.index].server,group:SERVER_DATA[result.index].group,mail:SERVER_DATA[result.index].mail});
      }
    });
  }

  openGroupDialog(server,index,group): void 
  {
    console.log(server+" "+group+" "+index);
    const dialogRef = this.dialog.open(GroupdialogComponent, 
    {
      width: '450px',
      data: {server:server,index:index,group:group}
    });

    dialogRef.afterClosed().subscribe(result => 
    {
      console.log(result);
      if(result)
      {
        SERVER_DATA[result.index].group = result.group;
        this.updateServers({server:SERVER_DATA[result.index].server,group:SERVER_DATA[result.index].group,mail:SERVER_DATA[result.index].mail});
      }
    });
  }

  checkBoxClick(filter:string,checked:boolean)
  {
    console.log("wawakjhasdgsaLKSAHDSA");
    console.log(checked);    
    // console.log(" CHECK BOX CLICK! "+filter);
    if(checked === false)
    {
      console.log("empty now");
      this.applyFilter('');
    }
    else
    {
      this.applyFilter(filter);
    }
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
