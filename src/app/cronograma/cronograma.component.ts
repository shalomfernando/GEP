import { Component, OnInit } from '@angular/core';
import {CronogramaService} from './cronograma.service';
import {Cronograma} from './Cronograma';

@Component({
  selector: 'app-cronograma',
  templateUrl: './cronograma.component.html',
  styleUrls: ['./cronograma.component.scss']
})
export class CronogramaComponent implements OnInit {

  listaCronograma: Cronograma[] = [];

  constructor(cronograma: CronogramaService) {
    cronograma.Listar().subscribe(listaCronograma => { console.log(listaCronograma); this.listaCronograma = listaCronograma; } );

  }
// tslint:disable-next-line:max-line-length

ngOnInit() {
}

}
