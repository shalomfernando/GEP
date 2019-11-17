import {Projetos} from './projetos';

export class PostProjeto {

  sigla: string;
  nome: string;
  descricao: string;
  objetivo: string;
  idUser: number;

  constructor(projeto: Projetos){
    this.sigla = projeto.sigla;
    this.nome = projeto.nome;
    this.descricao = projeto.descricao;
    this.objetivo = projeto.objetivo;
    this.idUser = JSON.parse(localStorage.getItem('currentUser')).id;
  }
}
