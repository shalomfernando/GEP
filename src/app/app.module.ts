import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { PageService, SortService, FilterService, GroupService } from '@syncfusion/ej2-angular-grids';

// used to create fake backend
// import {fakeBackendProvider} from './_helpers';

import {AppComponent} from './app.component';

import {JwtInterceptor, ErrorInterceptor} from './_helpers';

import {ChartModule} from 'primeng/chart';
import { MatSliderModule } from '@angular/material/slider';
import {
  AccordionModule,
  ButtonModule, CardModule, ConfirmDialogModule, DialogModule,
  InputTextModule, MenuModule, MessageService,
  MessagesModule,
  PaginatorModule,
  PanelMenuModule,
  PasswordModule, ProgressBarModule, RadioButtonModule, TabMenuModule, ToolbarModule
} from 'primeng/primeng';
import {StyleDefaultComponent} from '@app/pages/style-default/style-default.component';
import {HomeComponent} from '@app/pages/home';
import {ToastModule} from 'primeng/toast';
import {TarefaComponent} from '@app/pages/tarefa/tarefa.component';
import {LoginComponent} from '@app/pages/login';
import {NavbarComponent} from '@app/pages/navbar/navbar.component';
import {CronogramaComponent} from '@app/pages/cronograma/cronograma.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TableModule} from 'primeng/table';
import {ProjetosComponent} from '@app/pages/projetos/projetos.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {appRouting} from '@app/app.routing';
import {CalendarioComponent} from '@app/pages/calendario/calendario.component';
import {MenuLateralComponent} from '@app/pages/menu-lateral/menu-lateral.component';
import {FullCalendarModule} from 'primeng/fullcalendar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { GridModule } from '@syncfusion/ej2-angular-grids';


import {MenuNovoComponent} from './pages/menu-novo/menu-novo.component';
import {SidebarModule} from '@syncfusion/ej2-angular-navigations';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    TabMenuModule,
    AccordionModule,
    ToolbarModule,
    TableModule,
    FullCalendarModule,
    MenuModule,
    ConfirmDialogModule,
    RadioButtonModule,
    DialogModule,
    PaginatorModule,
    InputTextModule,
    ToastModule,
    ButtonModule,
    FontAwesomeModule,
    PanelMenuModule,
    PasswordModule,
    MessagesModule,
    ChartModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    appRouting,
    FullCalendarModule,
    CardModule,
    ProgressBarModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    GridModule, SidebarModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
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
    MenuNovoComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    PageService, SortService, FilterService, GroupService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
