import { Component, OnInit,HostBinding ,Output,ViewChild,AfterViewInit, EventEmitter} from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import {Router} from '@angular/router';
import { OverlayContainer} from '@angular/cdk/overlay';
import { HomeComponent } from '../home/home.component';
import { ServersComponent } from '../servers/servers.component';
import { SettingsComponent } from '../settings/settings.component';
import { SharedService } from './shared.service';

const dark = 'dark-theme';
const light = 'default-theme';

@Component({
  providers:[HomeComponent,ServersComponent,SettingsComponent],
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit
{
  host = ''
  title= 'alertingjsng';
  statuscolor = 'darkgreen';
  statustr = 'running'
  mArticles:Array<any>;
  mSources:Array<any>;
  options:Array<any>;

  status:boolean = true;
  content:number = 0;

  darktheme:boolean = false;
  memeswitch:boolean = false;
  pic:string = "../../assets/images/alertpng.png"
  disabled:boolean = true;

  message:string;

  // @Output() myEvent = new EventEmitter();
  // function2(){
  //   this.myEvent.emit(null)
  // }

  

  constructor(private http:HttpClient,private router: Router, public overlayContainer: OverlayContainer,private home:HomeComponent
  ,private servers:ServersComponent,private settings:SettingsComponent,private shared:SharedService)
  {
    console.log('app component constructor called');
  }

  @HostBinding('class') componentCssClass;

  // @ViewChild(HomeComponent) HomeComponent: HomeComponent;
  // @ViewChild(SettingsComponent) SettingsComponent: SettingsComponent;
  // @ViewChild(ServersComponent) ServersComponent: ServersComponent;

  // @Output() messageEvent = new EventEmitter<string>();

  ngOnInit() 
  {
    // this.shared.currentMessage.subscribe(message =>  message)
    this.init();
  }

  init()
  {
    this.options = [['Settings','settings'],['Servers','important_devices'],['Testing area','brush']];  
    
    let savedtheme:string = localStorage.getItem("theme");
    if(savedtheme == dark)
      this.toggleTheme();

    this.http.get(this.host+'/api/auth').subscribe((data:any) =>
    {
      if(data.admin)
        this.disabled = false;
    });
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
    console.log(this.content);
  }

  toggleTheme()
  {
    
    this.darktheme = !this.darktheme;

    if(this.darktheme)
    {
      this.overlayContainer.getContainerElement().classList.add(dark);
      this.overlayContainer.getContainerElement().classList.remove(light);
      this.componentCssClass = dark;
      localStorage.setItem("theme", dark);
    }
    else
    {
      this.overlayContainer.getContainerElement().classList.add(light);
      this.overlayContainer.getContainerElement().classList.remove(dark);
      this.componentCssClass = light;
      localStorage.setItem("theme", light);
    }
  }

  logout()
  {
    this.http.get(this.host+'/api/logout').subscribe((data:any) =>
    {
      if(data.logout)
        this.router.navigate([""]);
    });

  }

  help()
  {
    alert("biranium?");
    this.memeswitch = !this.memeswitch

    if(this.memeswitch)
    {
      this.pic = "../../assets/images/biran.png";
    }
    else
    {
      this.pic = "../../assets/images/alertpng.png";
    }
  }

  tabChanged($event)
  {
    console.log($event);

    if($event.index == 0)
    {
      this.shared.wakeupHome();
    }
    // else if($event.index == 1)
    // {
    //   this.shared.wakeupSettings();
    // }
    // else if($event.index == 2)
    // {
    //   this.shared.wakeupServers();
    // }
  }

}
