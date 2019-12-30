import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EthComponent } from './eth/eth.component';
import { HomeComponent } from './home/home.component';
import { HeadComponent } from './head/head.component';
import { HlfComponent } from './hlf/hlf.component';
import {FormsModule} from '@angular/forms';

const appRoutes: Routes = [
  { path: 'eth', component: EthComponent },
  { path: 'hlf', component: HlfComponent },
  { path: '', component: HomeComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    EthComponent,
    HomeComponent,
    HeadComponent,
    HlfComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
