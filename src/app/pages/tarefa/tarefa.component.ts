import {Component, OnInit} from '@angular/core';
import {Tarefa} from '../../model/tarefa';
import {TarefaService} from '../../service/tarefa.service';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.scss']
})
export class TarefaComponent implements OnInit {
  listaTarefas: Tarefa[] = [];

  constructor(tarefaService: TarefaService) {
    tarefaService.listar().subscribe(listaTarefas => {
      this.listaTarefas = listaTarefas;
    });
  }

  ngOnInit() {
  }

}
