import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Cronograma} from '../model/Cronograma';

const API = 'https://gep-api.herokuapp.com/Cronograma';

@Injectable({ providedIn: 'root'})
export class CronogramaService {
  constructor( private http: HttpClient) { }

  Listar() {
    return this.http.get<Cronograma[]>(API);
  }
  // cadastrar(cronograma: Cronograma): Observable<Cronograma> {
  //   return this.http.post<Cronograma>(this.heroesUrl, hero, httpOptions)
  //     .pipe(
  //       catchError(this.handleError('addHero', hero))
  //     );
  // }
}
