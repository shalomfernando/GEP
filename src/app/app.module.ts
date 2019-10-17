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

@NgModule({
  declarations: [
    AppComponent,
    StyleDefaultComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TabMenuModule,
    AccordionModule,
    MenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
