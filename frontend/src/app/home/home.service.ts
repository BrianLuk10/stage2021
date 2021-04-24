import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {VariablesGlobales} from '../variableGlobal';


@Injectable({
  providedIn: 'root'
})

export class GetHomeService {
  constructor(
    private http: HttpClient,
    private param: VariablesGlobales
  ){}

  listeArticleCall(){
    return this.http.get(this.param.url + '/articles');
  }

  listePrixCall(){
    return this.http.get(this.param.url + '/prix');
  }

  listeArticleCuisine(){
    return this.http.get(this.param.url + '/articles/categorie/1');
  }
  listeArticleIsotherme(){
    return this.http.get(this.param.url + '/articles/categorie/2');
  }
  listeArticleHotte(){
    return this.http.get(this.param.url + '/articles/categorie/3');
  }
  listeArticleFrigorifique(){
    return this.http.get(this.param.url + '/articles/categorie/4');
  }
  listeArticleLocaux(){
    return this.http.get(this.param.url + '/articles/categorie/5');
  }
}
