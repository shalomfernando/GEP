import {Tarefa} from '../tarefa';
import {User} from '@app/_models';

export class PushTarefa {

  descricao: string;
  dt_FIM: any;
  dt_FIM_PREV: any;
  dt_INICIO: any;
  dt_INICIO_PREV: any;
  responsavel: number;
  id_status: number;

  constructor(tarefa: Tarefa, status: any, usuuario: User) {
    this.descricao =  tarefa.descricao;
    this.dt_FIM = tarefa.dt_FIM ;
    this.dt_FIM_PREV = tarefa.dt_FIM_PREV;
    this.dt_INICIO = tarefa.dt_INICIO;
    this.dt_INICIO_PREV = tarefa.dt_INICIO_PREV;
    this.responsavel = tarefa.id_responsavel = null ? usuuario.id : tarefa.id_responsavel;
    this.id_status = tarefa.id_status;
  }
}
