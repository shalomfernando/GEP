import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Projetos} from './projetos';

const API = 'https://gep-api.herokuapp.com/Projeto';

@Injectable({ providedIn : 'root'})
export class ProjetoService {

  constructor( private http: HttpClient) {}

  ListarProjeto() {
    return this.http.get<Projetos[]>(API);
  }

}
