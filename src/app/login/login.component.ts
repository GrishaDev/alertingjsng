import { Component, OnInit,ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material'
import { HttpClient  } from '@angular/common/http';
import { NgForm } from '@angular/forms'
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-5000%)'}),
        animate('300ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
      animate('300ms ease-in', style({transform: 'translateY(0%)'}))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit 
{
  @ViewChild('f') form:NgForm;
  constructor(private router: Router,private http:HttpClient) { }
  username: string;
  password: string;
  valid:boolean = false;
  err:string;

    ngOnInit() {
      console.log(this.valid)
    }
    login() : void 
    {
      // if(this.username == 'admin' && this.password == 'admin'){
      // this.router.navigate(["main"]);
      // }else {
      //   alert("Invalid credentials");
      // }

      let it = this;

      const req = this.http.post('http://localhost:3000/api/loginsubmit', {
        "user": this.username,
        "pass": this.password
      })
      .subscribe(
        function(res:any)
        {
          console.log(res);
  
         // var user = JSON.parse(res.user);
          if(res.auth)
          {
            //alert("Connecting..");
            it.router.navigate(["main"]);
          }
          else
          {
            //alert("Invalid credentials");
            it.err = "Invalid credentials";
          }
        },
        err => {
          console.log("Error occured+ :: "+err);
          alert("Error connecting.");
        }
      );
    }

    inputChanged($event)
    {
      this.err="";
    }
}
