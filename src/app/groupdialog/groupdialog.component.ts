import { Component,Inject , NgZone, ViewChild} from '@angular/core';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {MatDialog,MAT_DIALOG_DATA,MatDialogRef} from '@angular/material';
import {take} from 'rxjs/operators'

export interface DialogData {
  server: string;
  index:number;
  group:string;
  grouplist:string[];
  tick:boolean;
}

@Component({
  selector: 'app-groupdialog',
  templateUrl: './groupdialog.component.html',
  styleUrls: ['./groupdialog.component.css']
})
export class GroupdialogComponent {

  ngOnInit() {
  }
  constructor(public dialogRef: MatDialogRef<GroupdialogComponent>,@Inject(MAT_DIALOG_DATA) public data: DialogData,private ngZone: NgZone) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  // @ViewChild('autosize') autosize: CdkTextareaAutosize;

  triggerResize(data) {
    // Wait for changes to be applied, then trigger textarea resize.
    // this.ngZone.onStable.pipe(take(1))
    //     .subscribe(() => this.autosize.resizeToFitContent(true));
       
  }
}
