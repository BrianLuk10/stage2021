import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  routeArticle: number;
  articles: any;

  constructor(private route: ActivatedRoute,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    this.routeArticle = this.route.snapshot.params['id'];
    this.http.get('http://localhost:8080/articles/' + this.routeArticle).subscribe((res) => {
      this.articles = res;
    });
  }

}
