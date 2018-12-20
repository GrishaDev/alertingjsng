import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog,MAT_DIALOG_DATA,MatDialogRef,MatPaginator,MatTableDataSource} from '@angular/material';
import { SettingdialogComponent } from '../settingdialog/settingdialog.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface Setting {
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

const SETTING_DATA: Setting[] = [
  {name: 'ip', value: "34.324324.324324.324:3245"},
  {name: 'peak', value: "90%"},
  {name: 'logs', value: "/var/log/da.log"},
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
 

 @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
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
      SETTING_DATA[result.index].value = result.value;
      //  console.log(result);
      //  console.log(this.newmails);
    });
  }

}
