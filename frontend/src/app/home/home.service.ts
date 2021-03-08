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

  listeArticleCuisine(){
    return this.http.get('http://localhost:8080/articles/categorie/1');
  }
  listeArticleIsotherme(){
    return this.http.get('http://localhost:8080/articles/categorie/2');
  }
  listeArticleHotte(){
    return this.http.get('http://localhost:8080/articles/categorie/3');
  }
  listeArticleFrigorifique(){
    return this.http.get('http://localhost:8080/articles/categorie/4');
  }
  listeArticleLocaux(){
    return this.http.get('http://localhost:8080/articles/categorie/5');
  }
}
