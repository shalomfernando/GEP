import {Cronograma, Projetos, User} from '@app/_models';

export class SalvarCronograma {
  descricao: string;
  idUser: number;
  // tslint:disable-next-line:variable-name
  id_projeto: number;
  lider: number;
  nome: string;
  origem: string;

  constructor(cronograma: Cronograma, projeto: Projetos, usuario: User) {
    this.descricao = cronograma.descricao;
    this.idUser = JSON.parse(localStorage.getItem('currentUser')).id;
    this.id_projeto = projeto.id;
    this.lider = usuario.id;
    this.nome = projeto.nome;
    this.origem = cronograma.origem;
  }

}

