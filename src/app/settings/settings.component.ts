import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog,MAT_DIALOG_DATA,MatDialogRef,MatPaginator,MatTableDataSource} from '@angular/material';
import { SettingdialogComponent } from '../settingdialog/settingdialog.component';
import { SettingsService } from '../settings.service';
//import { ChangeDetectorRef } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface Setting {
  id: number,
  name: string;
  value: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

let SETTING_DATA: Setting[] = [
  {id:0,name: 'ip', value: "34.324324.324324.324:3245"},
  {id:1,name: 'peak', value: "90%"},
  {id:2,name: 'logs', value: "/var/log/da.log"},
];

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

 // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  displayedColumns: string[] = ['name', 'value'];
 // dataSource = ELEMENT_DATA;
 dataSource = new MatTableDataSource<Setting>(SETTING_DATA);

 settingdata:string;

 @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog,private settingsapi:SettingsService) { }

  ngOnInit() 
  {
    console.log("settings component init");
    this.dataSource.paginator = this.paginator;
    this.updateTable();
    // console.log(this.settingdata);
    // this.getdata();
  }

  updateTable()
  {
    this.settingsapi.getSettings().subscribe((data:any) =>
      {

        SETTING_DATA = data;
        this.dataSource = new MatTableDataSource<Setting>(SETTING_DATA);
        this.dataSource.paginator = this.paginator;
        console.log(SETTING_DATA);
      });
  }


  openDialog(setting,value,index): void {
    const dialogRef = this.dialog.open(SettingdialogComponent, {
      width: '450px',
      height: '270px',
      data: {setting: setting,value:value,index:index}
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(`The dialog was closed ${result}`);
      console.log(result);
       //this.newmails = result;
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

}
