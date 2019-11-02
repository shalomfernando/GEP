import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApontamentoTarefa} from '@app/_models/tarefa/apontamento-tarefa';
import {environment} from '@environments/environment';
import {take} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ApontamentoService {
  constructor( private http: HttpClient) {}

  apontamento(aponta: ApontamentoTarefa, id: number) {
    console.log(id);
    return this.http.put(`${environment.apiUrl}/Tarefa/Apontamento/${id}`, aponta).pipe(take(1));
  }
}
