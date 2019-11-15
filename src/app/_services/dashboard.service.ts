import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environments/environment';
import {Dashboard} from '@app/_models/Dashboard';
import {ProgressoHome} from "@app/_models/ProgressoHome";
import {Colaborador} from "@app/_models/Colaborador";
import {ColumnsTarefas} from "@app/_models/ColumnsTarefas";

@Injectable({providedIn: 'root'})
export class DashboardService {
  constructor(private http: HttpClient) {
  }

  listarDash() {
    return this.http.get<Dashboard[]>(`${environment.apiUrl}/api/Dashboard`);
  }

  listarProgresso(){
    return this.http.get<ProgressoHome>(`${environment.apiUrl}/api/Dashboard/Progresso`);
  }

  listarColaboradores(){
    return this.http.get<Colaborador[]>(`${environment.apiUrl}/api/Dashboard/Colaboradores`)
  }

  listarDashGrid(){
    return this.http.get<ColumnsTarefas[]>(`${environment.apiUrl}/api/Dashboard/Grid`)
  }

}
