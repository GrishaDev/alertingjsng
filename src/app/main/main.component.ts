import { Component, OnInit,HostBinding } from '@angular/core';
import { SettingsService } from '../settings.service';
import {Router} from '@angular/router';
import { OverlayContainer} from '@angular/cdk/overlay';

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

  darktheme:boolean = false;

  constructor(private newsapi:SettingsService,private router: Router, public overlayContainer: OverlayContainer){
    console.log('app component constructor called');
   
  }

  @HostBinding('class') componentCssClass;

  ngOnInit() 
  {
    this.options = [['Settings','settings'],['Servers','important_devices'],['Testing area','brush']];     
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
    else if(option == "Testing area")
    {
      this.content = 2;
    }
  }

  toggleTheme()
  {
    let theme = 'dark-theme';
    let theme2 = 'light-theme';
    let theme3 = 'default-theme';

    this.darktheme = !this.darktheme;

    if(this.darktheme === true)
    {
      this.overlayContainer.getContainerElement().classList.add(theme);
      this.componentCssClass = theme;
    }
    else
    {
      this.overlayContainer.getContainerElement().classList.add(theme3);
      this.componentCssClass = theme3;
    }
  }
  logout()
  {
    this.router.navigate([""]);
  }

  help()
  {
    alert("It's all so simple")
  }
}
