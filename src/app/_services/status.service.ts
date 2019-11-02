import {environment} from '@environments/environment';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

const API = localStorage.getItem('apiUrl');


@Injectable({providedIn: 'root'})
export class StatusService {

  constructor(private http: HttpClient) {}
  listarStatus(tipo: string) {
    return this.http.get<any[]>(`${environment.apiUrl}/Status/Tipo/` + tipo);
  }
}
