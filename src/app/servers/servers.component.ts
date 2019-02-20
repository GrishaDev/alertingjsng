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
  // initdata:Server[]=[];
  // tempdata:Server[]=[];
  displayedColumns: string[] = ['group','server', 'cpu','ram','overloaded','mail'];
  filters: string [] = [];
  checkedfilters:string [] = [];
  checklist = [      
  ];
  grouplist:string [] = [];
  dataSource;
  loading:boolean = false;

  first:boolean = true;
  yea:boolean = true;
  searchdisabled:boolean = false;
  crap:boolean = false;
  peak:number = 200;
  errormsg:string = "";

  animation = false;
  
  defaultPredicate: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog,private serversapi:ServersService,private settingsapi:SettingsService) { }

  ngOnInit() 
  {
  

    this.animation = true;


    //comment this pls before build, client side testing

    this.dataSource  = new MatTableDataSource<Server>(SERVER_DATA);
    setTimeout(() => this.dataSource.paginator = this.paginator);

    this.grouplist = ['proservers','damoy','hamami','useless','amazing'];
    this.makeFilters();
    // ------------------------------

    this.updateTable();
    this.first=false;
  }

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
      this.getPeakValue();
      this.getGroupsList();
      this.makeFilters();
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
    this.filters = [];
    this.checklist = [];

    for(let i=0;i<SERVER_DATA.length;i++)
    {
      group = SERVER_DATA[i].group;

      if(this.filters.indexOf(group) === -1)
      {
        this.filters.push(group);
        this.checklist.push({value:group,isSelected:false});
      }
    }
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

  getGroupsList()
  {
    var x = "proservers,damoy,hamami,useless,amazing";
    this.grouplist = x.split(',');

    this.settingsapi.getSettings().subscribe((data:any) =>
    {
      for(let i=0;i<data.length;i++)
      {
        if(data[i].name=="groups")
        {
          this.grouplist = data[i].value.split(',');
          console.log(this.grouplist);
        }
      }
    },
    (err) => {console.log("Error contacting settings service, server down? details: "+JSON.stringify(err));
    this.errormsg="Error getting some data from database, but overall ok"});
  }

  updateServers(data)
  {
    // this.makeFilters();
    this.serversapi.postmails(data).subscribe((res:any) =>
    {
        if(res.hack)
        { 
          console.log("nice cheater");
          this.errormsg="Nice try, but it won't work";
        }
        else if(res.status)
        {
          // this.updateTable();
          console.log("succesful servers update!");
        }
    },
    (err) => {console.log("Error contacting servers service, server down? details: "+JSON.stringify(err));
    this.errormsg="Error updating mails, try again soon"});
  }

  updateGroups(data)
  {
    this.makeFilters();
    this.serversapi.postgroups(data).subscribe((res:any) =>
    {
        if(res.hack)
        { 
          console.log("nice cheater");
          this.errormsg="Nice try, but it won't work";
        }
        else if(res.status)
        {
          // this.updateTable();
          console.log("succesful servers update!");
        }
    },
    (err) => {console.log("Error contacting servers service, server down? details: "+JSON.stringify(err));
    this.errormsg="Error updating groups, try again soon"});
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

  openDialog(server,mails,index,group): void 
  {
    console.log(server+" "+mails+" "+index);
    const dialogRef = this.dialog.open(ServerdialogComponent, 
    {
      width: '450px',
      data: {server:server,mails: mails,index:index,group:group,tick:false}
    });

    dialogRef.afterClosed().subscribe(result => 
    {
      console.log(result);
      if(result)
      {
        console.log("you ticked "+result.tick);
        if(result.tick)
        {
          for(let i=0; i<SERVER_DATA.length; i++)
          {
            if(SERVER_DATA[i].group == result.group)
            {
              SERVER_DATA[i].mail = result.mails;
              this.updateServers({server:SERVER_DATA[i].server,mail:SERVER_DATA[i].mail});
            }
          }
        }
        else
        {
          SERVER_DATA[result.index].mail = result.mails;
          this.updateServers({server:SERVER_DATA[result.index].server,mail:SERVER_DATA[result.index].mail});
        }
      }
    });
  }

  openGroupDialog(server,index,group): void 
  {
    let oldgroup = group;
    console.log(server+" "+group+" "+index);
    const dialogRef = this.dialog.open(GroupdialogComponent, 
    {
      width: '450px',
      data: {server:server,index:index,group:group,grouplist:this.grouplist}
    });

    dialogRef.afterClosed().subscribe(result => 
    {
      console.log(result);
      if(result)
      {
        this.uncheckAll();
        this.filters = [];
        this.checkedfilters =[];
      
        SERVER_DATA[result.index].group = result.group;
        this.updateGroups({server:SERVER_DATA[result.index].server,group:SERVER_DATA[result.index].group});

        this.dataSource = new MatTableDataSource<Server>(SERVER_DATA);
        this.dataSource.paginator = this.paginator;
        setTimeout(() => this.dataSource.paginator = this.paginator);
      }
    });
  }

  parseFilterData()
  { 
    let groups = [];
    let currentdata = SERVER_DATA;
    // this.tempdata = currentdata;
    let newdata = [];

    for(let i=0; i<currentdata.length; i++)
    {
      for(let j=0; j<this.checkedfilters.length; j++)
      {
        if(currentdata[i].group == this.checkedfilters[j])
        {
          newdata.push(currentdata[i]);
        }
      }
    }

    this.dataSource = new MatTableDataSource<Server>(newdata);
    this.dataSource.paginator = this.paginator;
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }
  checkBoxClick(filter:string,checked:boolean)
  {
    if(checked)
    {
      this.checkedfilters.push(filter);
      for(let i =0; i<this.checklist.length; i++)
      {
        if(this.checklist[i].value == filter)
        {
          this.checklist[i].isSelected = true;
        }
      }
      console.log("You checked "+checked+" and here checked filters: "+this.checkedfilters);
      this.parseFilterData();
    }
    else
    {
      let index:number = this.checkedfilters.indexOf(filter);
      this.checkedfilters.splice(index,1);

      for(let i =0; i<this.checklist.length; i++)
      {
        if(this.checklist[i].value == filter)
        {
          this.checklist[i].isSelected = false;
        }
      }
      console.log("You checked "+checked+" and here checked filters: "+this.checkedfilters);
      if(this.checkedfilters.length == 0)
      {
        console.log("here u should get init data..");
        this.dataSource = new MatTableDataSource<Server>(SERVER_DATA);
        setTimeout(() => this.dataSource.paginator = this.paginator);
      }
      else
      {
        console.log("here u should get tmp data");
        // this.dataSource = new MatTableDataSource<Server>(this.tempdata);
        // this.dataSource.paginator = this.paginator;
        this.parseFilterData();
      }
    }
  }

  uncheckAll() {
    for (var i = 0; i < this.checklist.length; i++) {
      this.checklist[i].isSelected = false;
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log("HAHAH "+this.dataSource.filter);
  }

  search(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log("HAHAH "+this.dataSource.filter);
  }
}
