import construct = Reflect.construct;

export class Tarefa {
  id_responsavel: number;
  id_status: number;
  id_projeto: number;
  id_cronograma: number;
  descricao: string;
  dias: number;
  dias_PREV: number;
  dt_FIM: Date;
  dt_FIM_PREV: Date;
  dt_INICIO: Date;
  dt_INICIO_PREV: Date;
  id: number;
  responsavel: string;
  status: string;
  idUser: bigint;
}
