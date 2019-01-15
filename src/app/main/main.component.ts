import { Component, OnInit,HostBinding } from '@angular/core';
import { SettingsService } from '../settings.service';
import {Router} from '@angular/router';
import { OverlayContainer} from '@angular/cdk/overlay';

const dark = 'dark-theme';
const light = 'default-theme';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit 
{
  title= 'alertingjsng';
  statuscolor = 'darkgreen';
  statustr = 'running'
  mArticles:Array<any>;
  mSources:Array<any>;
  options:Array<any>;

  status:boolean = true;
  content:number = 0;

  darktheme:boolean = false;

  constructor(private newsapi:SettingsService,private router: Router, public overlayContainer: OverlayContainer)
  {
    console.log('app component constructor called');
  }

  @HostBinding('class') componentCssClass;

  ngOnInit() 
  {
    this.init();
  }

  init()
  {
    this.options = [['Settings','settings'],['Servers','important_devices'],['Testing area','brush']];  
    
    let savedtheme:string = localStorage.getItem("theme");
    if(savedtheme == dark)
      this.toggleTheme();
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
    // let dark = 'dark-theme';
    // let theme2 = 'light-theme';
    // let light = 'default-theme';
    
    this.darktheme = !this.darktheme;

    if(this.darktheme)
    {
      this.overlayContainer.getContainerElement().classList.add(dark);
      this.componentCssClass = dark;
      localStorage.setItem("theme", dark);
    }
    else
    {
      this.overlayContainer.getContainerElement().classList.add(light);
      this.componentCssClass = light;
      localStorage.setItem("theme", light);
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
