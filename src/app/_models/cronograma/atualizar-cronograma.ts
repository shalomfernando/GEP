import {Cronograma, User} from '@app/_models';

export class AtualizarCronograma {
  descricao: string;
  dt_FIM: any;
  dt_FIM_PREV: any;
  dt_INICIO: any;
  dt_INICIO_PREV: any;
  id_lider: number;
  id_status: number;
  nome: string;
  origem: string;

  constructor(cronograma: Cronograma, usuario: User, status: any) {
    this.descricao = cronograma.descricao;
    // this.dt_FIM = new Date(cronograma.dt_FIM);
    // this.dt_FIM_PREV = new Date(cronograma.dt_FIM_PREV);
    // this.dt_INICIO = new Date(cronograma.dt_INICIO);
    // this.dt_INICIO_PREV = new Date(cronograma.dt_INICIO_PREV);
    this.id_lider = usuario == null ? cronograma.id_lider : usuario.id;
    this.id_status = status == null ? cronograma.id_status : status.id ;
    this.nome = cronograma.nome;
    this.origem = cronograma.origem;
  }

}
