import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import {RouterModule,Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {GetHomeService} from "./home/home.service";
import { ArticlesComponent } from './articles/articles.component';
import {NgxPaginationModule} from "ngx-pagination";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: '404', redirectTo: '', pathMatch: 'full'},
  {path: 'articles/:id', component:ArticlesComponent},
  {path: '**', redirectTo: ''},

];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    ArticlesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    NgxPaginationModule,

  ],
  providers: [GetHomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
