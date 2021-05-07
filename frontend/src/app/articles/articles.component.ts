import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {VariablesGlobales} from '../variableGlobal';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  providers: [VariablesGlobales]
})
export class ArticlesComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private param: VariablesGlobales) {
  }

  routeArticle: number;
  articles: any;
  paypalAmount: any;

  @ViewChild('paypalRef', {static: true}) private paypalRef: ElementRef;
  getValue(){
    this.paypalAmount = (<HTMLInputElement> document.getElementById('paypalInput')).value;
  }

  getArticles(){
    this.http.get(this.param.url + '/articles/' + this.routeArticle).subscribe((res) => {
      this.articles = res;
      
    });
  }
  ngOnInit(): void {
    this.routeArticle = this.route.snapshot.params['id'];
    this.getArticles()
    window.paypal.Buttons(
      {
        style: {
          layout: 'horizontal',
          color: 'gold',
          shape: 'rect',
          label: 'paypal'
        },
        
        createOrder: (data, actions) => {
          this.getValue();
          return actions.order.create({
            purchase_units: [
              {
                reference_id: this.articles.id,
                amount: {
                  value: this.paypalAmount
                }
              }
            ]
          });
        },

        onApprove: function(data, actions) {
          return actions.order.capture().then(function(details) {
              // Show a success message to the buyer
              alert('Cette transaction a été effectuée par ' + details.payer.name.given_name + '!');
              return fetch('http://localhost:8080/dons',
              {
                method:'POST',
                headers: {'content-type':'application/json'},
                body: JSON.stringify({
                  dons: details.purchase_units[0].amount.value, 
                  id: details.purchase_units[0].reference_id
                })
              })
          });
      },

        onError: error => {
          console.log(error);
          alert("Une erreur s'est produite, veuillez recharger la page.")
        }
      }
    ).render(this.paypalRef.nativeElement)
  }

}
