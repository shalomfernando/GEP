import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StyleDefaultComponent} from './style-default/style-default.component';
import {HomeComponent} from './home/home.component';
import {CronogramaComponent} from './cronograma/cronograma.component';
import {ProjetosComponent} from './projetos/projetos.component';
import {TarefaComponent} from './tarefa/tarefa.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {
    path: 'style-default',
    component : StyleDefaultComponent
  }
  ,
  {
    path: 'home',
    component : HomeComponent
  },
  {
    path: 'cronograma',
    component : CronogramaComponent
  },
  {
    path: 'projeto',
    component : ProjetosComponent
  },
  {
    path: 'tarefa',
    component : TarefaComponent
  },
  {
    path: 'login',
    component : LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
