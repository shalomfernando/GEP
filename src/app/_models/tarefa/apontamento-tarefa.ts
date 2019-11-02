import {Tarefa, User} from '@app/_models';

export class ApontamentoTarefa {
  horas: string;
  id_user: number;
  mensagem: string;
  status_ID: number;

  constructor(tarefa: Tarefa, user: User, n: number) {

    console.log(tarefa, n);
    this.horas = '';
    this.id_user = 1;
    this.mensagem = '';
    // tslint:disable-next-line:triple-equals
    this.status_ID = n == 1 ? 1 : n == 2 ? 2 : n == 3 ? 5 : 1;
    console.log(ApontamentoTarefa, n);
  }
}
