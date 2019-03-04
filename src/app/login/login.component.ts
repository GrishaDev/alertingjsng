import { Component, OnInit,ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material'
import { HttpClient  } from '@angular/common/http';
import { NgForm } from '@angular/forms'
import { trigger, state, style, animate, transition } from '@angular/animations';
import { LoginService } from './login.service';

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
  constructor(private router: Router,private http:HttpClient,private loginservice:LoginService) { }
  username: string;
  password: string;
  isvalid:boolean = false;
  err:string;

    ngOnInit() {
      console.log(this.isvalid)
    }
    login() : void 
    {
      let it = this;

      const req = this.http.post('/api/loginsubmit', {
        "user": this.username,
        "pass": this.password
      })
      .subscribe(
        function(res:any)
        {
          console.log(res);
  
          if(res.auth)
          {
            it.router.navigate(["main"]);
          }
          else
          {
            it.err = "Invalid credentials";
          }
        },
        err => {
          console.log("Error occured+ :: "+err);
          it.err = "Error connecting";
        }
      );
    }

    inputChanged($event)
    {
      this.err="";
    }
}
