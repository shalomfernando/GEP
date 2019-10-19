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

  constructor(cronograma: CronogramaService) {
    cronograma.Listar().subscribe(listaCronograma => { console.log(listaCronograma); this.listaCronograma = listaCronograma; } );

  }
// tslint:disable-next-line:max-line-length

ngOnInit() {
}

}
