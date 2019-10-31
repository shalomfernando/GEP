import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Menu} from '@app/_models';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) {
  }

  ListarMenu() {
    return this.http.get<Menu[]>(`${environment.apiUrl}/Menu`);
  }
}
