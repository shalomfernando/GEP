import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {take} from 'rxjs/operators';
import {AtualizarCronograma, Cronograma} from '@app/_models';
import {environment} from '@environments/environment';

@Injectable({providedIn: 'root'})
export class CronogramaService {
  constructor(private http: HttpClient) {
  }
  GET() {
    return this.http.get<Cronograma[]>(`${environment.apiUrl}/Cronograma`);
  }

  salvarCronograma(cronograma: any) {
    return this.http.post<Cronograma[]>(`${environment.apiUrl}/Cronograma`, cronograma).pipe(take(1));
  }

  PUT(cronograma: AtualizarCronograma, id: number) {
    return this.http.put<Cronograma[]>(`${environment.apiUrl}/Cronograma`, cronograma).pipe(take(1));
  }

  deletarCronograma(id) {
    return this.http.delete(`${environment.apiUrl}/Cronograma${id}`).pipe(take(1)).subscribe();
  }
}
