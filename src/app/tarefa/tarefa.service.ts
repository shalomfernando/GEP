import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Tarefa} from './tarefa';

const API = 'https://gep-api.herokuapp.com/Tarefa';
@Injectable({providedIn: 'root'})
export class TarefaService {
 constructor(private http: HttpClient) { }

 listar() {
   return this.http.get<Tarefa[]>(API);
 }
}
