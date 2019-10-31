import {Projetos} from './projetos';
import {Injectable} from '@angular/core';

export class PushProjeto {
  descricao: string;
  nome: string;
  objetivo: string;
  sigla: string;

  constructor(projeto: Projetos) {
    this.descricao = projeto.descricao;
    this.nome = projeto.nome;
    this.objetivo = projeto.objetivo;
    this.sigla = projeto.sigla;
  }
}
