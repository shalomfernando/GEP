import { Component, OnInit } from '@angular/core';
import {TarefaService} from './tarefa.service';
import {Tarefa} from './tarefa';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.scss']
})
export class TarefaComponent implements OnInit {
  listaTarefas: Tarefa[] = [];
  constructor(tarefaService: TarefaService) {
    tarefaService.listar().subscribe( listaTarefas => { this.listaTarefas = listaTarefas; } );
  }

  ngOnInit() {
  }

}
