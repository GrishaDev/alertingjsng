import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

const host = ''

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient) { }
  
  getCount()
  {
   return this.http.get(host+'/api/count');
  }
  getMails()
  {
    return this.http.get(host+'/api/mails');
  }
}
