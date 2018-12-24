import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ServersService 
{
  constructor(private http:HttpClient) { }

  getServers()
  {
   return this.http.get('http://localhost:3000/api/getservers');
  }
  postservers(data)
  {
    console.log(" i am getting .. ");
    console.log(data);
    return this.http.post('http://localhost:3000/api/postservers',data);
  }
}
