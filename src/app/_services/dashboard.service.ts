import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Tarefa} from '@app/_models';
import {environment} from '@environments/environment';
import {Dashboard} from '@app/_models/Dashboard';

@Injectable({providedIn: 'root'})
export class DashboardService {
  constructor(private http: HttpClient) {
  }

  listarDash() {
    return this.http.get<Dashboard[]>(`${environment.apiUrl}/Dashboard`);
  }

}
