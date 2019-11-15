import {Component, OnInit} from '@angular/core';
import {Dashboard} from '@app/_models/Dashboard';
import {DashboardService} from '@app/_services/dashboard.service';
import {ProgressoHome} from "@app/_models/ProgressoHome";
import {PageSettingsModel} from '@syncfusion/ej2-angular-grids';
import {Colaborador} from "@app/_models/Colaborador";




@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading = false;
  data: Dashboard[];
  progresso: ProgressoHome;
  public colaboradores: Colaborador[];
  public filterSettings: Object;
  public pageOptions: PageSettingsModel;

  constructor(private dashService: DashboardService) {
  }

  ngOnInit() {
    this.filterSettings = {type: 'Menu'};
    this.pageOptions = {pageSize: 10};
    this.dashService.listarColaboradores().subscribe(x => this.colaboradores = x);
    this.loading = true;
    this.dashService.listarDash().subscribe(x => this.data = x);
    this.dashService.listarProgresso().subscribe(x => this.progresso = x);
  }

}
