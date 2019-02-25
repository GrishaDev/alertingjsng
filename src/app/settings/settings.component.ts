import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog,MAT_DIALOG_DATA,MatDialogRef,MatPaginator,MatTableDataSource} from '@angular/material';
import { SettingdialogComponent } from './settingdialog/settingdialog.component';
import { SettingsService } from './settings.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

export interface Setting {
  id: number,
  name: string;
  value: string;
}

let SETTING_DATA: Setting[] = [
  {id:0,name: 'ip', value: "34.324324.324324.324:3245"},
  {id:1,name: 'peak', value: "90%"},
  {id:2,name: 'logs', value: "/var/log/da.log"},
  {id:3,name: 'json',value:`[
    {
      "plates": [
        980202164,
        "anything",
        "from",
        "nodded",
        "them",
        930041708.5745473
      ],
      "cold": -1490343731.0349832,
      "generally": 759206740.9525161,
      "cent": -1910939618,
      "any": -1889045821.1710515,
      "acres": true
    },
    true,
    "audience",
    true,
    "element",
    false
  ]`}
];

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
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
export class SettingsComponent implements OnInit 
{
  displayedColumns: string[] = ['name', 'value'];
   dataSource;
  settingdata:string;

  loading:boolean = false;
  first:boolean = true;

  animation = false;

  errormsg:string = "";

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog,private settingsapi:SettingsService) { }

  onView()
  {
    console.log("viewing Settings tab");
    this.updateTable();
  }

  ngOnInit() 
  {
    console.log("settings component init");
    this.animation = true;

    // this.dataSource = new MatTableDataSource<Setting>(SETTING_DATA);
    // setTimeout(() => this.dataSource.paginator = this.paginator);

    // this.dataSource.paginator = this.paginator;
    this.updateTable();
    this.first=false;
  }

  updateTable()
  {
    if(!this.first)
    this.loading = true;

    this.settingsapi.getSettings().subscribe((data:any) =>
    {

      SETTING_DATA = data;
      SETTING_DATA.sort(function(a, b) {
        return a.id - b.id;
      });
      this.dataSource = new MatTableDataSource<Setting>(SETTING_DATA);
      this.dataSource.paginator = this.paginator;
      this.errormsg= "";
      console.log("got new settings data");
      setTimeout(function() {this.loading=false;}.bind(this), 500);
    },
    (err) => {console.log("Error contacting settings service, server down? details: "+JSON.stringify(err));
    this.errormsg="Error getting data from database, try again soon."
    this.loading=false;});
  }


  openDialog(setting,value,index): void 
  {
    console.log("wawawaw "+index);
    const dialogRef = this.dialog.open(SettingdialogComponent, 
    {
      width: '450px',
      data: {setting: setting,value:value,index:index}
    });

    dialogRef.afterClosed().subscribe(result => 
    {
      console.log(result);
      if(result)
      {
        SETTING_DATA[result.index].value = result.value;
        this.updateSettings(SETTING_DATA);
      }
    });
  }

  updateSettings(data)
  {
    this.settingsapi.postsettings(data).subscribe((res:any) =>
    {
        if(res.hack)
        { 
          console.log("nice cheater");
          this.errormsg="Nice try, but it won't work";
        }
        else if(res.status)
        {
          // this.updateTable();
          console.log("succesful settings update!");
        }
        else
        {
          console.log("failed settings update.");
          this.errormsg="Error getting data from database, try again soon."
        }
    });
  }

  resetSettings()
  {
    this.settingsapi.resetSettings().subscribe((res:any) =>
    {
        if(res.hack)
        {
          console.log("nice cheater");
          this.errormsg="Nice try, but it won't work";
        }
        else if(res.status)
        {
          this.updateTable();
          console.log("succesful settings reset!");
        }
        else
        {
          console.log("failed settings reset.");
          this.errormsg="Error getting data from database, try again soon."
        }
    });
  }
}
