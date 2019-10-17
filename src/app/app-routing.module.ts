import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StyleDefaultComponent} from './style-default/style-default.component';

const routes: Routes = [{path: 'style-default', component : StyleDefaultComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
