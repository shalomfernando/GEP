import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StyleDefaultComponent} from './pages/style-default/style-default.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import {TabMenuModule} from 'primeng/tabmenu';
import {AccordionModule} from 'primeng/accordion';
import {NavbarComponent} from './pages/navbar/navbar.component';
import {MenuModule} from 'primeng/menu';
import {HttpClientModule} from '@angular/common/http';
import {CalendarioComponent} from './pages/calendario/calendario.component';
import {FullCalendarModule} from 'primeng/fullcalendar';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {CronogramaComponent} from './pages/cronograma/cronograma.component';
import {ProjetosComponent} from './pages/projetos/projetos.component';
import {TarefaComponent} from './pages/tarefa/tarefa.component';
import {MenuLateralComponent} from './pages/menu-lateral/menu-lateral.component';

@NgModule({
  declarations: [
    AppComponent,
    StyleDefaultComponent,
    NavbarComponent,
    CalendarioComponent,
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
    HttpClientModule,
    BrowserAnimationsModule,
    TabMenuModule,
    AccordionModule,
    MenuModule,
    FullCalendarModule,
    FullCalendarModule,
    FullCalendarModule,
    MenuModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
