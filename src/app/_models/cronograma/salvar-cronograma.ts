import {Cronograma, Projetos, User} from '@app/_models';

export class SalvarCronograma {
  data_fim: any;
  data_fim_prevista: any;
  data_inicio: any;
  data_inicio_prevista: any;
  descricao: string;
  idUser: number;
  id_projeto: number;
  lider: number;
  nome: string;
  origem: string;

  constructor(cronograma: Cronograma, projeto: Projetos, usuario: User) {
    this.data_fim = cronograma.dt_FIM;
    this.data_fim_prevista = cronograma.dt_FIM_PREV;
    this.data_inicio = cronograma.dt_INICIO;
    this.data_inicio_prevista = cronograma.dt_INICIO_PREV;
    this.descricao = cronograma.descricao;
    this.idUser = 1;
    this.id_projeto = projeto.id;
    this.lider = usuario.id;
    this.nome = projeto.nome;
    this.origem = cronograma.origem;


  }

}

