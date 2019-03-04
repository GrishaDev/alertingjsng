import { Component, OnInit,HostBinding } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { OverlayContainer} from '@angular/cdk/overlay';
import {Router} from '@angular/router';

const dark = 'dark-theme';
const light = 'default-theme';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit 
{
  host = ''
  pic:string = "../../../assets/images/alertpng.png";
  isdarktheme:boolean = false;
  ismemeswitch:boolean = false;

  constructor(private http:HttpClient,public overlayContainer: OverlayContainer,private router: Router) { }

  @HostBinding('class') componentCssClass;

  ngOnInit() {
  }
  
  toggleTheme()
  {
    this.isdarktheme = !this.isdarktheme;

    if(this.isdarktheme)
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
    this.ismemeswitch = !this.ismemeswitch

    if(this.ismemeswitch)
    {
      this.pic = "../../../assets/images/biran.png";
    }
    else
    {
      this.pic = "../../../assets/images/alertpng.png";
    }
  }
}
