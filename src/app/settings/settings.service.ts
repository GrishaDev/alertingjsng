import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
// import * as config from './config.json';

const host = ''
// const dada:any = (<any>config);

@Injectable({
  providedIn: 'root'
})

export class SettingsService 
{
  constructor(private http:HttpClient) { }
  
  getSettings()
  {
    return this.http.get(host+'/api/getsettings');
  }
  postsettings(data)
  {
    return this.http.post(host+'/api/postsettings',data);
  }

  resetSettings()
  {
    return this.http.get(host+'/api/initsettings');
  }
}
