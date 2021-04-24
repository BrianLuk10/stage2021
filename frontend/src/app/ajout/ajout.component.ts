import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GetHomeService } from '../home/home.service';
import {VariablesGlobales} from '../variableGlobal';

@Component({
  selector: 'app-ajout',
  templateUrl: './ajout.component.html',
  styleUrls: ['./ajout.component.scss'],
  providers: [VariablesGlobales]
})
export class AjoutComponent implements OnInit {

listes:any;
printedOption: number;
selectedOption: number

  constructor(private http: HttpClient,
    private api: GetHomeService,
    private param: VariablesGlobales) { }


    ajouter(){
      this.printedOption = this.selectedOption;
      let prix = (<HTMLInputElement>document.getElementById("prix")).value;

      if(prix != "" && this.printedOption != undefined){
      fetch(this.param.url + '/dons',
      {
        method:'POST',
        headers: {'content-type':'application/json'},
        body: JSON.stringify({
          dons: prix, 
          id: this.printedOption
        })
      })
      alert("Ajout du don validé !")
    }
    else{
      alert("Veuillez remplir les champs")
    }
    }

  ngOnInit(): void {
    this.api.listeArticleCall().subscribe((res) => {
      this.listes = res;
    })
  }

}
