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
  test: any;

  constructor( private http: HttpClient,
               private api: GetHomeService) { }

  ngOnInit(): void {
    this.api.listeArticleCall().subscribe((res) => {
      this.liste = res;
    });
  }

}
