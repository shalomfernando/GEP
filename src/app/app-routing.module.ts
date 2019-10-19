import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StyleDefaultComponent} from './pages/style-default/style-default.component';
import {HomeComponent} from './pages/home/home.component';
import {CronogramaComponent} from './pages/cronograma/cronograma.component';
import {ProjetosComponent} from './pages/projetos/projetos.component';
import {TarefaComponent} from './pages/tarefa/tarefa.component';
import {LoginComponent} from './pages/login/login.component';
import {CalendarioComponent} from './pages/calendario/calendario.component';

const routes: Routes = [
  {
    path: 'style-default',
    component: StyleDefaultComponent
  }
  ,
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'cronograma',
    component: CronogramaComponent
  },
  {
    path: 'projeto',
    component: ProjetosComponent
  },
  {
    path: 'tarefa',
    component: TarefaComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'calendario',
    component: CalendarioComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
