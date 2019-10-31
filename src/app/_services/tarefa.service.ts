import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {take} from 'rxjs/operators';
import {PostTarefa, PushTarefa, Tarefa} from '@app/_models';
import {environment} from '@environments/environment';


@Injectable({providedIn: 'root'})
export class TarefaService {
  constructor(private http: HttpClient) {
  }

  listar() {
    return this.http.get<Tarefa[]>(`${environment.apiUrl}/Tarefa`);
  }

  buscaDatas() {
    return this.http.get(`${environment.apiUrl}/Tarefa/Calendario`);
  }

  SalvarTarefa(tarefa: PostTarefa) {
    return this.http.post<PostTarefa[]>(`${environment.apiUrl}/Tarefa`, tarefa).pipe(take(1));
  }

  deletarCronograma(id: number) {
    return this.http.delete(`${environment.apiUrl}/Tarefa/${id}`).pipe(take(1)).subscribe();

  }

  atualizarTarefa(tarefa: PushTarefa, id: number) {
    console.log(tarefa, 'id', id);
    return this.http.put<PushTarefa[]>(`${environment.apiUrl}/Tarefa/${id}`, tarefa).pipe(take(1)).subscribe();
  }
}
