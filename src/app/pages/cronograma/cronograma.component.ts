import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {AtualizarCronograma, Cronograma, Projetos, SalvarCronograma, User} from '@app/_models';
import {CronogramaService, ProjetoService, TarefaService, UserService} from '@app/_services';
import {first} from 'rxjs/operators';


@Component({
  selector: 'app-cronograma',
  templateUrl: './cronograma.component.html',
  styleUrls: ['./cronograma.component.scss'],
  providers: [ConfirmationService]
})


export class CronogramaComponent implements OnInit {


  listaCronograma: Cronograma[] = [];

  displayDialog: boolean;
  editCronograma: Cronograma;
  selectedCronograma: Cronograma;
  newCronograma: boolean;
  cronograma: Cronograma;

  /*  Dropdown projeto*/
  projeto: Projetos[] = [];
  selectedProjetos: Projetos;

  loading = false;
  users: User[];
  listaUsuario: User[] = [];
  selectUsuario: User;

  /* Dropdown status*/
  listarStatus: any[] = [];
  selectedStatus: any;
  //
  valorAsync: any;

  colunas: any[] = [
    {field: 'projeto', header: 'PROJETO'},
    {field: 'descricao', header: 'DESCRICAO'},
    {field: 'origem', header: 'ORIGEM'},
    {field: 'lider', header: 'LIDER'},
    {field: 'status', header: 'STATUS'},
    {field: 'dt_INICIO_PREV', header: 'DATA INICIO PREVISTA'},
    {field: 'dt_FIM_PREV', header: 'DATA FIM PREVISTA'},
    {field: 'dias_PREV', header: 'DIAS PREVISTOS'},
    {field: 'dt_INICIO', header: 'DATA INICIO'},
    {field: 'dt_FIM', header: 'DATA FIM'},
  ];

  constructor(private cronogramaService: CronogramaService,
              private projetoService: ProjetoService,
              private userService: UserService,
              private messageService: MessageService,
              private confirma: ConfirmationService) {
  }

  ngOnInit() {
    this.projetoService.ListarProjeto().subscribe(listaProjetos => this.projeto = listaProjetos);
    // this.cronogramaService.listarStatus('CRN').subscribe(listarStatus => this.listarStatus = listarStatus);
    this.cronogramaService.GET().subscribe(listaCronograma => {
      this.listaCronograma = listaCronograma;
    });
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.loading = false;
      this.users = users;
    });

    this.selectedProjetos = null;
    this.selectUsuario = null;
    this.selectedCronograma = null;

  }

  showDialogToAdd() {
    this.newCronograma = true;
    this.editCronograma = new Cronograma();
    this.displayDialog = true;

    this.selectedProjetos = null;
    this.selectUsuario = null;
    this.selectedCronograma = null;


  }

  save() {
    let crono = [...this.listaCronograma];


    if (this.newCronograma) {

      crono.push(this.editCronograma);
      let cronograma = new SalvarCronograma(this.editCronograma, this.selectedProjetos, this.selectUsuario);
      this.cronogramaService.salvarCronograma(cronograma).subscribe();

    } else {
      crono[this.listaCronograma.indexOf(this.cronograma)] = this.editCronograma;
      let cronograma = new AtualizarCronograma(this.editCronograma, this.selectUsuario, this.selectedStatus);
      this.cronogramaService.PUT(cronograma, this.editCronograma.id).subscribe();
    }

    this.editCronograma = null;
    this.displayDialog = false;
    this.selectedProjetos = null;
    this.selectUsuario = null;
    this.selectedCronograma = null;

    this.valorAsync = new Promise((resolver, reject) => {
      setTimeout(() => resolver(this.cronogramaService.GET().subscribe(listaCronograma => {
        this.listaCronograma = listaCronograma;
      })), 1000);
    });

    this.cronogramaService.GET().subscribe(listaCronograma => {
      this.listaCronograma = listaCronograma;
    });

    this.showSalvo();

  }

  delete() {

    let index = this.listaCronograma.indexOf(this.cronograma);
    this.listaCronograma = this.listaCronograma.filter((val, i) => i != index);
    this.editCronograma = null;
    this.displayDialog = false;

    this.cronogramaService.deletarCronograma(this.cronograma.id);

  }

  onRowSelect(event) {
    this.newCronograma = false;
    this.editCronograma = this.cloneCronograma(event.data);
    this.displayDialog = true;
    this.selectedProjetos = null;
    this.selectUsuario = null;
    this.selectedCronograma = null;
  }

  cloneCronograma(c: Cronograma): Cronograma {
    let crono = {};
    for (let prop in c) {
      crono[prop] = c[prop];
    }
    return <Cronograma>crono;
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
