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
  {value:'Elenor Anderson',isSelected:false},
  {value:'Caden Kunze',isSelected:true},
  {value:'Ms. Hortense Zulauf',isSelected:true},
  {value:'Grady Reichert',isSelected:false},
  {value:'Dejon Olson',isSelected:false},
  {value:'Jamir Pfannerstill',isSelected:false},
  {value:'Aracely Renner DVM',isSelected:false},
  {value:'Genoveva Luettgen',isSelected:false}
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

    // this.dataSource  = new MatTableDataSource<Server>(SERVER_DATA);
    // setTimeout(() => this.dataSource.paginator = this.paginator);

    // this.grouplist = ['proservers','damoy','hamami','useless','amazing'];
    // this.makeFilters();
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
      // this.initdata= SERVER_DATA;
      // this.tempdata = SERVER_DATA;
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
          // let str = data[i].value;
          // let cropped = str.slice(0,str.length-1)
          
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
        else
        {
          console.log("failed servers update.");
          this.errormsg="Error getting data from database, try again soon."
        }
    });
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
        this.updateServers({server:SERVER_DATA[result.index].server,mail:SERVER_DATA[result.index].mail});
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
        console.log("??? "+this.crap);
      
        SERVER_DATA[result.index].group = result.group;
        this.updateGroups({server:SERVER_DATA[result.index].server,group:SERVER_DATA[result.index].group});
        // let index = this.checkedfilters.indexOf(oldgroup);
        // this.checkedfilters.splice(index,1);
        console.log("WIPE NOW");
        
        // setTimeout(() => this.crap = false);

        this.checkedfilters = [];

        console.log("aaaaaaaaaaaaAAAAAAAAAAAAAAA");
        console.log(this.checkedfilters);
        console.log(this.filters);
        this.dataSource = new MatTableDataSource<Server>(SERVER_DATA);
        this.dataSource.paginator = this.paginator;
        setTimeout(() => this.dataSource.paginator = this.paginator);
        // this.checkedfilters.push(result.group);
        // console.log("aaaaaaaaaaaaAAAAAAAAAAAAAAA");
        // console.log(this.checkedfilters);
        // this.makeFilters();
        // this.parseFilterData();
      }
    });
  }

  parseFilterData()
  { 
    let groups = [];
    let currentdata = SERVER_DATA;
    // this.tempdata = currentdata;
    let newdata = [];

    console.log("FUCK OFF PEICE OF SHIT "+this.checkedfilters);
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
    console.log("parsed new data");
    console.log(newdata);
    this.dataSource = new MatTableDataSource<Server>(newdata);
    console.log(this.dataSource.paginator);
    console.log(this.paginator);
    this.dataSource.paginator = this.paginator;
    console.log(this.dataSource.paginator);
    setTimeout(() => this.dataSource.paginator = this.paginator);
    // setTimeout(this.poop.bind(this), 2000);
  }
  checkBoxClick(filter:string,checked:boolean)
  {
    // let a = [];
    // a = this.dataSource.data;
    // a = a.filter((this.filterbyGroup(filter)))
    // console.log(a);

    if(checked)
    {
      console.log("HELLO?!?!?!? "+filter);
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
      // console.log("You checked "+checked+" and here checked filters: "+this.checkedfilters);
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
