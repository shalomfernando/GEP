export class Cronograma {
      origem: string;
      lider: string;
      dt_INICIO_PREV: any;
      dt_FIM_PREV: any;
      dias_PREV: number;
      dt_INICIO: any;
      dt_FIM: any;
      nome: string;
      descricao: string;
      status: string;
      projeto: string;
      id: number;
      id_lider: number;
      id_projeto: number;
      id_status: number;
      idUser: number;
      // tarefa: any;

  // tslint:disable-next-line:variable-name
  convert( data: string) {
    const dataa = new Date(data);
    return data
  }

}
