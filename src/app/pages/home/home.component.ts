import {Component, OnInit} from '@angular/core';
import {Projetos, User} from '@app/_models';
import {Dashboard} from '@app/_models/Dashboard';
import {DashboardService} from '@app/_services/dashboard.service';


@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
  loading = false;
  users: User[];
  data: Dashboard[];
  ListProjeto: Projetos[];

  constructor(private dashService: DashboardService ) {
  }

  ngOnInit() {
    this.loading = true;
    this.dashService.listarDash().subscribe(x => this.data = x);
  }

}
