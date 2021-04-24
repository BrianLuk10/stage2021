import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GetHomeService} from "./home.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  liste: any;
  prix:any;
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
  prixAll= 0;
  donAll= 0;
  pourcentage: number;


  constructor( private http: HttpClient,
               private api: GetHomeService) {
    for (let i = 1; i <= 1000; i++) {
      this.collection.push(`item ${i}`);
    }
  }


  ngOnInit(): void {
        const gaugeElement = document.querySelector(".gauge");

function setGaugeValue(gauge, value) {
  if (value < 0 || value > 1) {
    return;
  }

  gauge.querySelector(".gauge__fill").style.transform = `rotate(${
    value / 2
  }turn)`;
  gauge.querySelector(".gauge__cover").textContent = `${Math.round((
    value*100)*100)/100
  }%`;
}

    this.api.listeArticleCall().subscribe((res) => {
      this.liste = res;
      this.liste.sort(function(a, b) {
        return b.titre - a.titre;
      });
    });

    this.api.listePrixCall().subscribe((res) => {
      this.prix = res;
      for(let i=0; i < this.prix.length; i++ ){
        this.donAll += this.prix[i].don
        this.prixAll += this.prix[i].prixTotal
      }
      this.pourcentage = Math.round((this.donAll/this.prixAll + Number.EPSILON) * 1000) / 1000
      console.log(this.pourcentage)
      
setGaugeValue(gaugeElement, this.pourcentage);
      
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
    });

    this.api.listeArticleCall().subscribe((res) => {
      this.plusCher = res;
      this.plusCher.sort(function(a, b) {
        return b.prix - a.prix;
      });
    });
    this.filtre = 'tout';
    
  }
  key: string ='titre';
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

}
