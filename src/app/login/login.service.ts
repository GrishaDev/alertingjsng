import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

const host = ''

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  postsmails(data)
  {
    return this.http.post(host+'/api/login',data);
  }
}
