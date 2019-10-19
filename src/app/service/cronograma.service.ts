import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Cronograma} from '../model/Cronograma';
import {take} from 'rxjs/operators';

const API = 'https://gep-api.herokuapp.com/Cronograma';

@Injectable({ providedIn: 'root'})
export class CronogramaService {
  constructor( private http: HttpClient) { }

  GET() {
    return this.http.get<Cronograma[]>(API);
  }
  POST(cronograma: any) {
    return this.http.post<Cronograma>(API, cronograma).pipe(take(1));
  }
}
