import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

const host = 'http://localhost:3000'

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
}
