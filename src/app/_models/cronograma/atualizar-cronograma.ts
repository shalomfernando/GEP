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
    this.dt_FIM = cronograma.dt_FIM;
    this.dt_FIM_PREV = cronograma.dt_FIM_PREV;
    this.dt_INICIO = cronograma.dt_INICIO;
    this.dt_INICIO_PREV = cronograma.dt_INICIO_PREV;
    this.id_lider = 1; // deve listar todos os liders e verificar qual esta relacionado ao id
    // this.id_status = status.st_ID;
     this.id_status = 1;
    // deve listar todos os o status para assim verificar qual esta relacionado com o id
    this.nome = cronograma.nome;
    this.origem = cronograma.origem;
  }

}
