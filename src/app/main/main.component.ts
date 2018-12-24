import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  title= 'alertingjsng';
  statuscolor = 'darkgreen';
  statustr = 'running'
  mArticles:Array<any>;
  mSources:Array<any>;
  options:Array<any>;

  status:boolean = true;
  content:number = 0;

  constructor(private newsapi:SettingsService,private router: Router){
    console.log('app component constructor called');
   
  }

  ngOnInit() {
    this.options = ['Settings','Servers'];     
        //load articles
    //   this.newsapi.initArticles().subscribe(data => this.mArticles = data['articles']);
    // //load news sources
    // this.newsapi.initSources().subscribe(data=> this.mSources = data['sources']);  
    }


  searchArticles(source){
    console.log("selected source is: "+source);
    // this.newsapi.getArticlesByID(source).subscribe(data => this.mArticles = data['articles']);
  }

  changeStatus()
  {
    if(this.status)
    {
      this.status = false;
      this.statuscolor = 'red';
      this.statustr = 'down'
    }
    else
    {
      this.status = true;
      this.statuscolor = 'darkgreen';
      this.statustr = 'running'
    }
  }

  navPress(option)
  {
    if(option == "Settings")
    {
      this.content = 0;
    }
    else if(option == "Servers")
    {
      this.content = 1;
    }
  }

  logout()
  {
    this.router.navigate([""]);
  }
}
