import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SettingsService 
{

  // api_key = 'a90f763d39634719b9f0e2391f1060f9';

  constructor(private http:HttpClient) { }

  // initSources()
  // {
  //    return this.http.get('https://newsapi.org/v2/sources?language=en&apiKey='+this.api_key);
  // }
  // initArticles()
  // {
  //  return this.http.get('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey='+this.api_key);
  // }
  // getArticlesByID(source: String)
  // {
  //  return this.http.get('https://newsapi.org/v2/top-headlines?sources='+source+'&apiKey='+this.api_key);
  // }
  getSettings()
  {
   return this.http.get('http://localhost:3000/api/getsettings');
  }
  postsettings(data)
  {
    console.log(" i am getting .. ");
    console.log(data);
    return this.http.post('http://localhost:3000/api/postsettings',data);
  }
}
