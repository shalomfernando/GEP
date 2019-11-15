import {Component, OnInit} from '@angular/core';
import {DashboardService} from "@app/_services/dashboard.service";
import {ColumnsTarefas} from "@app/_models/ColumnsTarefas";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public primaryXAxis: Object;
  public columnData: ColumnsTarefas[];
  public title: string;
  public primaryYAxis: Object;
  public chartArea: Object;
  public dragSettings: Object;
  public tooltip: Object;

  constructor(private _serviceDash: DashboardService) {
  }

  ngOnInit() {
    this.title = 'Grafico de andamento do mês';
    this._serviceDash.listarDashGrid().subscribe(x => this.columnData = x);
    this.primaryXAxis = {
      valueType: 'Category',
      minimum: -0.5,
      maximum: 6.5,
      labelPlacement: 'OnTicks',
      majorGridLines: {width: 0},
    };
    this.primaryYAxis = {
      rangePadding: 'None',
      minimum: 0,
      title: 'Tarefas concluídas',
      labelFormat: '{value} tarefas',
      maximum: 10,
      interval: 1,
      lineStyle: {width: 0},
      majorTickLines: {width: 0},
      minorTickLines: {width: 0}
    };
    this.chartArea = {
      border: {
        width: 0
      }
    };
    this.dragSettings = {
      enable: false
    };
    this.tooltip = {
      enable: true
    }
  }
}
