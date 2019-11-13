import {Component, OnInit} from '@angular/core';
import {Dashboard} from '@app/_models/Dashboard';
import {DashboardService} from '@app/_services/dashboard.service';
import {ProgressoHome} from "@app/_models/ProgressoHome";
import {PageSettingsModel} from '@syncfusion/ej2-angular-grids';



@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading = false;
  data: Dashboard[];
  progresso: ProgressoHome;
  public datas: Object[];
  public filterSettings: Object;
  public pageOptions: PageSettingsModel;

  constructor(private dashService: DashboardService) {
  }

  ngOnInit() {
    this.filterSettings = {type: 'Menu'};
    this.pageOptions = {pageSize: 7};
    this.datas = [
      {ID: 10249, NOME: 'TOMSP', VALOR: 11.61, PAÍS: ' Germany'},
      {ID: 10250, NOME: 'HANAR', VALOR: 65.83, PAÍS: 'Brazil'},
      {ID: 10251, NOME: 'VICTE', VALOR: 41.34, PAÍS: 'France'},
      {ID: 10252, NOME: 'SUPRD', VALOR: 51.3,  PAÍS: 'Belgium'},
      {ID: 10248, NOME: 'VINET', VALOR: 32.38, PAÍS: 'France'},
      {ID: 10253, NOME: 'HANAR', VALOR: 58.17, PAÍS: 'Brazil'},
      {ID: 10254, NOME: 'CHOPS', VALOR: 22.98, PAÍS: 'Switzerland'},
      {ID: 10255, NOME: 'RICSU', VALOR: 148.33,PAÍS: 'Switzerland'},
      {ID: 10256, NOME: 'SUPRD', VALOR: 13.97, PAÍS: 'Brazil'},
      {ID: 10257, NOME: 'WELLI', VALOR: 14.23, PAÍS: 'Venezuela'},
      {ID: 10258, NOME: 'VICTE', VALOR: 18.33, PAÍS: 'France'},
      {ID: 10259, NOME: 'WELLI', VALOR: 28.13, PAÍS: 'Brazil'},
      {ID: 10260, NOME: 'CHOPS', VALOR: 48.34, PAÍS: 'Switzerland'},
      {ID: 10261, NOME: 'SUPRD', VALOR: 32.73, PAÍS: ' Germany'},
      {ID: 10262, NOME: 'TOMSP', VALOR: 12.31, PAÍS: 'Switzerland'},
      {ID: 10263, NOME: 'VICTE', VALOR: 23.77, PAÍS: 'Brazil'},
      {ID: 10264, NOME: 'SUPRD', VALOR: 43.47, PAÍS: 'Venezuela'},
      {ID: 10265, NOME: 'CHOPS', VALOR: 53.37, PAÍS: 'Belgium'},
    ];
    this.loading = true;
    this.dashService.listarDash().subscribe(x => this.data = x);
    this.dashService.listarProgresso().subscribe(x => this.progresso = x);
  }

}
