import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {take} from 'rxjs/operators';
import {PostProjeto, Projetos, PushProjeto} from '@app/_models';
import {environment} from '@environments/environment';

const API = localStorage.getItem('apiUrl');

@Injectable({providedIn: 'root'})
export class ProjetoService {
  constructor(private http: HttpClient) {
  }

  ListarProjeto() {
    return this.http.get<Projetos[]>(`${environment.apiUrl}/Projeto`);
  }

  // listarStatus(tipo: string) {
  //   return this.http.get<any[]>(`${environment.apiUrl}/Status/Tipo/` + tipo);
  // }

  salvarProjeto(projeto: PostProjeto) {
    return this.http.post(`${environment.apiUrl}/Projeto`, projeto);
  }

  atualizaProjeto(projeto: PushProjeto, id: number) {
    return this.http.put<PostProjeto>(`${environment.apiUrl}/Projeto/${id}`, projeto).pipe(take(1));
  }

  deletarProjeto(id: number) {
    return this.http.delete(`${environment.apiUrl}/Projeto/${id}`).pipe(take(1)).subscribe();
  }


}
