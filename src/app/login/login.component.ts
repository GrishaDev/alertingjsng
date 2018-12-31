import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material'
import { HttpClient  } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit 
{
  constructor(private router: Router,private http:HttpClient) { }
  username: string;
  password: string;
    ngOnInit() {
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
            alert("Invalid credentials");
          }
        },
        err => {
          console.log("Error occured+ :: "+err);
          alert("Error connecting.");
        }
      );
    }
}
