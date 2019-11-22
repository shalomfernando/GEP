import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserCadastro} from "@app/_models/UserCadastro";
import {environment} from '@environments/environment';


@Injectable({providedIn: 'root'})
export class CadastroServicesService {
  constructor(private  http: HttpClient ) {}
  SalvarCadastro() {
    this.http.post<UserCadastro[]>(`${environment.apiUrl}/Cronograma`);
  }
}
