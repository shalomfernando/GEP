import {Cronograma, User} from '@app/_models';

export class AtualizarCronograma {
  descricao: string;
  id_lider: number;
  id_status: number;
  nome: string;
  origem: string;

  constructor(cronograma: Cronograma, usuario: User, status: any) {
    this.descricao = cronograma.descricao;
    this.id_lider = usuario == null ? cronograma.id_lider : usuario.id;
    this.id_status = status == null ? cronograma.id_status : status.id ;
    this.nome = cronograma.nome;
    this.origem = cronograma.origem;
  }

}
