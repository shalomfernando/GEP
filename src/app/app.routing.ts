import {Routes, RouterModule} from '@angular/router';

import {AuthGuard} from './_helpers';
import {HomeComponent} from '@app/pages/home';
import {StyleDefaultComponent} from '@app/pages/style-default';
import {CronogramaComponent} from '@app/pages/cronograma';
import {ProjetosComponent} from '@app/pages/projetos';
import {TarefaComponent} from '@app/pages/tarefa';
import {CalendarioComponent} from '@app/pages/calendario';
import {LoginComponent} from '@app/pages/login';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'style-default', component: StyleDefaultComponent, canActivate: [AuthGuard] },
  {path: 'cronograma', component: CronogramaComponent, canActivate: [AuthGuard] },
  {path: 'projeto', component: ProjetosComponent, canActivate: [AuthGuard] },
  {path: 'tarefa', component: TarefaComponent, canActivate: [AuthGuard] },
  {path: 'login', component: LoginComponent},
  {path: 'calendario', component: CalendarioComponent, canActivate: [AuthGuard] },
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  // otherwise redirect to home
  // {path: '**', redirectTo: ''}
];

export const appRouting = RouterModule.forRoot(routes);
