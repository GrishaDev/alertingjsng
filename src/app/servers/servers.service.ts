import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

const host = ''

@Injectable({
  providedIn: 'root'
})
export class ServersService 
{
  constructor(private http:HttpClient) { }

  getServers()
  {
   return this.http.get(host+'/api/getservers');
  }
  postservers(data)
  {
    return this.http.post(host+'/api/postservers',data);
  }
  postmails(data)
  {
    return this.http.post(host+'/api/postmails',data);
  }
  postgroups(data)
  {
    return this.http.post(host+'/api/postgroups',data);
  }
}
