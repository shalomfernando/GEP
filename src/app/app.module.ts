import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StyleDefaultComponent } from './style-default/style-default.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import {TabMenuModule} from 'primeng/tabmenu';
import {AccordionModule} from 'primeng/accordion';
import { NavbarComponent } from './navbar/navbar.component';
import {MenuModule} from 'primeng/menu';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CronogramaComponent } from './cronograma/cronograma.component';
import { ProjetosComponent } from './projetos/projetos.component';
import { TarefaComponent } from './tarefa/tarefa.component';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    StyleDefaultComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    CronogramaComponent,
    ProjetosComponent,
    TarefaComponent,
    MenuLateralComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TabMenuModule,
    AccordionModule,
    MenuModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
