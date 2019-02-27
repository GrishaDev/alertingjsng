import { Component, OnInit,Injectable } from '@angular/core';
import { HomeService } from './home.service';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
import { SharedService } from '../main/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
@Injectable()
export class HomeComponent implements OnInit {


  constructor(private homeapi:HomeService,private shared: SharedService) { }

  mails:number = 0;
  hours:number = 0;
  minutes:number = 0;
  errormsg:string ="";
  index:number;

  onView()
  {
    console.log("viewing Home tab");
    this.updateData();
  }

  receiveMessage($event) {
    // this.message = $event
    console.log($event);
  }

  wakeup()
  {
    console.log("I am home!");
    this.updateData();
  }

  ngOnInit() {
    this.shared.homeMessage.subscribe(index => this.wakeup());
    this.updateData();
  }

  // newMessage() {
  //   this.shared.changeMessage("Hello from Sibling")
  // }

  updateData()
  {
    this.homeapi.getCount().subscribe((data:any) =>
    {
      console.log(data);
      // var x:number = (data.minutes)/60
      // this.hours = Number(x.toFixed(2));
      var datka:number = data.minutes;
      this.hours = Math.floor(datka/60);
      datka = datka - (this.hours * 60);
      this.minutes = datka;
    },
    (err) => {console.log("Error contacting home service, server down? details: "+JSON.stringify(err));
    this.errormsg="Error getting data from database, try again soon."});

    this.homeapi.getMails().subscribe((data:any) =>
    {
      console.log(data);
      this.mails = data.mails
    },
    (err) => {console.log("Error contacting home service, server down? details: "+JSON.stringify(err));
    this.errormsg="Error getting data from database, try again soon."});
  }

  // ngAfterViewChecked() {
  //   console.log("hello user view home again");
  // }

  // ngAfterContentChecked()
  // {
  //   console.log("hello user view home again");
  // }

  // ngAfterContentInit()
  // {
  //   console.log("hello user view home again");
  // }

}
