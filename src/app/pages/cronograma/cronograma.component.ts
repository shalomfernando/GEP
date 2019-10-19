import { Component, OnInit } from '@angular/core';
import {Cronograma} from '../../model/Cronograma';
import {CronogramaService} from '../../service/cronograma.service';

@Component({
  selector: 'app-cronograma',
  templateUrl: './cronograma.component.html',
  styleUrls: ['./cronograma.component.scss']
})
export class CronogramaComponent implements OnInit {

  listaCronograma: Cronograma[] = [];


  constructor(private cronogramaService: CronogramaService) {
    cronogramaService.GET().subscribe(listaCronograma => { console.log(listaCronograma); this.listaCronograma = listaCronograma; } );
    this.POST(this.testePost);
  }

// tslint:disable-next-line:max-line-length


  private testePost: any = {
     data_fim: '2019-10-18T14:58:38.458Z',
    data_fim_prevista: '2019-10-18T14:58:38.458Z',
    data_inicio: '2019-10-18T14:58:38.458Z',
    data_inicio_prevista: '2019-10-18T14:58:38.458Z',
    descricao: 'string',
    idUser: 1,
    id_projeto: 1,
    lider: 1,
    nome: 'string',
    origem: 'string'
  };

  POST( cronograma: any) {
    this.cronogramaService.POST(cronograma).subscribe();
    console.log(cronograma);
  }

ngOnInit() {
}

}
