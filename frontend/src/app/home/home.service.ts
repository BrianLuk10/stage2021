import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class GetHomeService {
  constructor(
    private http: HttpClient
  ){}

  listeArticleCall(){
    return this.http.get('http://localhost:8080/articles');
  }

}
