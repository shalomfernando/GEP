import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Cronograma, PostTarefa, Projetos, PushTarefa, Tarefa, User} from '@app/_models';
import {CronogramaService, ProjetoService, TarefaService, UserService} from '@app/_services';
import {first} from 'rxjs/operators';
import {ApontamentoTarefa} from "@app/_models/tarefa/apontamento-tarefa";
import {ApontamentoService} from "@app/_services/apontamento.service";

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.scss'],
  providers: [ConfirmationService]
})
export class TarefaComponent implements OnInit {
  listaTarefas: Tarefa[] = [];

  colunas: any[];
  tarefa: Tarefa;

  displayDialog: boolean;
  editTarefas: Tarefa;
  newTarefa: boolean;
  cadastroTarefa: PostTarefa;

  loading = false;
  users: User[];
  selectUsuario: User;

  listaProjeto: Projetos[] = [];
  selectProjeto: Projetos;

  listaCronograma: Cronograma[] = [];
  selectCronograma: Cronograma;

  listaStatus: any[] = [];
  selectStatus: any;
  valorAsync: any;


  constructor(private tarefaService: TarefaService,
              private cronogramaService: CronogramaService,
              private projetoService: ProjetoService,
              private userService: UserService,
              private messageService: MessageService,
              private confirma: ConfirmationService,
              private apont: ApontamentoService) {
  }

  ngOnInit() {
    this.tarefaService.listar().subscribe(listaTarefas => {
      this.listaTarefas = listaTarefas;
    });

    this.userService.getAll().pipe(first()).subscribe(users => {
      this.loading = false;
      this.users = users;
    });
    this.tarefaService.listarStatus().subscribe(status => this.listaStatus = status);
    this.cronogramaService.GET().subscribe(cronograma => this.listaCronograma = cronograma);
    this.projetoService.ListarProjeto().subscribe(projeto => this.listaProjeto = projeto);

    this.colunas = [
      {field: 'descricao', header: 'Descricao'},
      {field: 'dias', header: 'Dias'},
      {field: 'dt_INICIO', header: 'Data Inicio'},
      {field: 'dt_FIM', header: 'Data Fim'},
      {field: 'responsavel', header: 'Responsavel'},
      {field: 'status', header: 'Status'},
    ];
  }


  showDialogToAdd() {
    this.editTarefas = new Tarefa();
    this.newTarefa = true;
    this.displayDialog = true;
  }

  save() {
    let taref = [...this.listaTarefas];
    console.log(this.newTarefa);
    if (this.newTarefa) {
      taref.push(this.editTarefas);
      console.log(this.editTarefas.dt_INICIO_PREV, 'data_inicio_prevista');

      const tarefa = new PostTarefa(this.editTarefas, this.selectCronograma, this.selectProjeto, this.selectUsuario);
      console.log(tarefa);
      this.tarefaService.SalvarTarefa(tarefa).subscribe();
    } else {
      taref[this.listaTarefas.indexOf(this.tarefa)] = this.editTarefas;
      console.log(this.editTarefas, this.selectStatus, this.selectUsuario);

      const tarefa = new PushTarefa(this.editTarefas,this.selectStatus,this.selectUsuario);
      console.log(tarefa);
      this.tarefaService.atualizarTarefa(tarefa, this.editTarefas.id);
    }

    this.listaTarefas = taref;
    this.editTarefas = null;
    this.displayDialog = false;
    this.showSalvo();

    this.valorAsync = new Promise((resolver, reject) => {
      setTimeout(() => resolver(this.tarefaService.listar().subscribe(listaTarefa => {
        this.listaTarefas = listaTarefa;
      })), 1000);
    });
  }

  delete() {

    const index = this.listaTarefas.indexOf(this.tarefa);
    // tslint:disable-next-line:triple-equals
    this.listaTarefas = this.listaTarefas.filter((val, i) => i != index);
    this.editTarefas = null;
    this.displayDialog = false;

    this.tarefaService.deletarCronograma(this.tarefa.id);
  }


  onRowSelect($event: any) {
    this.newTarefa = false;
    this.editTarefas = this.cloneTarefa($event.data);
    this.displayDialog = true;
  }

  cloneTarefa(c: Tarefa): Tarefa {
    const taref = {};
    // tslint:disable-next-line:forin
    for (const prop in c) {
      taref[prop] = c[prop];
    }
    return <Tarefa> taref;
  }

  obterApontamento(n: number) {
    const apontamento = new  ApontamentoTarefa(this.editTarefas, this.selectUsuario, n);
    return this.apont.apontamento(apontamento, this.editTarefas.id).subscribe();
  }


  confirm() {
    this.confirma.confirm({
      message: 'Tem certeza de que deseja continuar?',
      header: 'Confimação',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.showSuccess();
        this.delete();

      },
      reject: () => {
        this.showError();
        this.displayDialog = false;
      }
    });
  }

  showSuccess() {
    this.messageService.add({severity: 'success', summary: 'Operação Concluida', detail: 'Registro apagado'});
  }

  showSalvo() {
    this.messageService.add({severity: 'success', summary: 'Operação Concluida', detail: 'Processo Concluido'});
  }

  showInfo() {
    this.messageService.add({severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks'});
  }

  showWarn() {
    this.messageService.add({severity: 'warn', summary: 'Warn Message', detail: 'There are unsaved changes'});
  }

  showError() {
    this.messageService.add({severity: 'error', summary: 'Operação Cancelada', detail: ':('});
  }
}
