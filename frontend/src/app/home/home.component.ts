import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GetHomeService} from "./home.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  liste: any;
  collection = [];
  page: number;
  filtre: string;
  cuisine:any;
  isotherme:any;
  hotte:any;
  frigorifique:any;
  locaux:any;
  plusCher:any;
  moinsCher:any;


  constructor( private http: HttpClient,
               private api: GetHomeService) {
    for (let i = 1; i <= 1000; i++) {
      this.collection.push(`item ${i}`);
    }
  }

  ngOnInit(): void {
    this.api.listeArticleCall().subscribe((res) => {
      this.liste = res;
    });
    this.api.listeArticleCuisine().subscribe((res) => {
      this.cuisine = res;
    });
    this.api.listeArticleIsotherme().subscribe((res) => {
      this.isotherme = res;
    });
    this.api.listeArticleHotte().subscribe((res) => {
      this.hotte = res;
    });
    this.api.listeArticleFrigorifique().subscribe((res) => {
      this.frigorifique = res;
    });
    this.api.listeArticleLocaux().subscribe((res) => {
      this.locaux = res;
    });
    this.api.listeArticleCall().subscribe((res) => {
      this.moinsCher = res;
      this.moinsCher.sort(function(a, b) {
        return a.prix - b.prix;
      });
      console.log(this.moinsCher)
    });

    this.api.listeArticleCall().subscribe((res) => {
      this.plusCher = res;
      this.plusCher.sort(function(a, b) {
        return b.prix - a.prix;
      });
      console.log(this.plusCher)
    });
    this.filtre = 'tout';
  }

}
