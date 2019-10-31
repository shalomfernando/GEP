import {Injectable} from '@angular/core';
import {Tarefa} from '../tarefa';
import {Cronograma, Projetos} from '@app/_models';
import {User} from '@app/_models';

export class PostTarefa {

  descricao: string;
  dt_FIM: any;
  dt_FIM_PREV: any;
  dt_INICIO: any;
  dt_INICIO_PREV: any;
  idUser: number;
  id_cronograma: number;
  id_projeto: number;
  id_responsavel: number;

  constructor(tarefa: Tarefa, cronograma: Cronograma, projeto: Projetos, usuario: User) {
    this.descricao = tarefa.descricao;
    this.dt_FIM = tarefa.dt_FIM;
    this.dt_FIM_PREV = tarefa.dt_FIM_PREV;
    this.dt_INICIO = tarefa.dt_INICIO;
    this.dt_INICIO_PREV = tarefa.dt_INICIO_PREV;
    this.idUser = 1;
    this.id_cronograma = cronograma.id;
    this.id_projeto = projeto.id;
    this.id_responsavel = usuario.id;
  }
}