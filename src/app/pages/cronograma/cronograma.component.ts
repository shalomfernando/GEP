import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {AtualizarCronograma, Cronograma, Projetos, SalvarCronograma, User} from '@app/_models';
import {CronogramaService, ProjetoService, TarefaService, UserService} from '@app/_services';
import {first} from 'rxjs/operators';
import {StatusService} from '@app/_services/status.service';
import {Dashboard} from '@app/_models/Dashboard';
import {ProgressoHome} from '@app/_models/ProgressoHome';
import {
  PageSettingsModel,
  CommandModel,
  EditSettingsModel,
  DialogEditEventArgs,
  SaveEventArgs,
  ToolbarItems
} from '@syncfusion/ej2-grids';
import {FormGroup} from '@angular/forms';


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


  // novo grid
  data: Dashboard[];
  progresso: ProgressoHome;
  // tslint:disable-next-line:ban-types
  public datas: Object[];
  // tslint:disable-next-line:ban-types
  public filterSettings: Object;
  public pageOptions: PageSettingsModel;


  // @ts-ignore
  @ViewChild('orderForm')
  public orderForm: FormGroup;
  public editSettings: EditSettingsModel;
  public commands: CommandModel[];
  public toolbar: ToolbarItems[];

  // fim

  colunas: any[];

  constructor(private cronogramaService: CronogramaService,
              private projetoService: ProjetoService,
              private userService: UserService,
              private messageService: MessageService,
              private confirma: ConfirmationService,
              private statusService: StatusService) {
  }

  ngOnInit() {
    this.projetoService.ListarProjeto().subscribe(listaProjetos => this.projeto = listaProjetos);
    this.statusService.listarStatus('CRN').subscribe(listarStatus => this.listarStatus = listarStatus);
    this.buscaCronograma();
    // this.filterSettings = {type: 'Menu'};
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.loading = false;
      this.users = users;
    });
    this.filterSettings = {type: 'Menu'};

    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: 'Dialog',
      showDeleteConfirmDialog: true
    };
    this.toolbar = ['Add'];
    this.commands = [
      {type: 'Edit', buttonOption: {cssClass: 'e-flat', iconCss: 'e-edit e-icons'}},
      {type: 'Delete', buttonOption: {cssClass: 'e-flat', iconCss: 'e-delete e-icons'}},
      {type: 'Save', buttonOption: {cssClass: 'e-flat', iconCss: 'e-update e-icons'}},
      {type: 'Cancel', buttonOption: {cssClass: 'e-flat', iconCss: 'e-cancel-icon e-icons'}}];

    this.selectedProjetos = null;
    this.selectUsuario = null;
    this.selectedCronograma = null;

  }

  actionBegin(args: SaveEventArgs): void {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      this.cronograma = Object.assign(args.rowData);
    }
    if (args.requestType === 'save') {
      console.log(this.selectedCronograma)
      if (this.orderForm.valid) {
        if (this.editCronograma.id) {
          const cronograma = new AtualizarCronograma(this.editCronograma, this.selectUsuario, this.selectedStatus);
          this.cronogramaService.PUT(cronograma, this.editCronograma.id).subscribe(
            () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Cronograma atualizado com sucesso.'
              });
            },
            r => {
              this.messageService.add({
                severity: 'error',
                summary: 'Erro ao atualizar cronograma.'
              });
            }
          );
        } else {
          const cronograma = new SalvarCronograma(this.editCronograma, this.selectedProjetos, this.selectUsuario);
          this.cronogramaService.salvarCronograma(cronograma).subscribe(() => {
              this.messageService.add({
                severity: 'success',
                summary: 'Cronograma cadastrado com sucesso.',
                sticky: true
              });
            },
            r => {
              this.messageService.add({
                severity: 'error',
                summary: 'Erro ao cadastrar cronograma.'
              });
            }
          );
        }
        this.buscaCronograma();
      } else {
        args.cancel = true;
      }
    }
    if (args.requestType === 'delete') {
      console.log(args.data[0].id);
      this.projetoService.deletarProjeto(args.data[0].id);
    }
  }

  actionComplete(args: DialogEditEventArgs): void {
    if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
      args.form.ej2_instances[0].rules = {};
      // Set initail Focus
      if (args.requestType === 'beginEdit') {
        (args.form.elements.namedItem('Nome') as HTMLInputElement).focus();
      }
    }

  }



buscaCronograma() {
  this.cronogramaService.GET().subscribe(listaCronograma => {
    this.listaCronograma = listaCronograma;
  });
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
    const crono = [...this.listaCronograma];


    if (this.newCronograma) {

      crono.push(this.editCronograma);
      const cronograma = new SalvarCronograma(this.editCronograma, this.selectedProjetos, this.selectUsuario);
      this.cronogramaService.salvarCronograma(cronograma).subscribe();
      console.log(cronograma);
    } else {
      crono[this.listaCronograma.indexOf(this.cronograma)] = this.editCronograma;
      const cronograma = new AtualizarCronograma(this.editCronograma, this.selectUsuario, this.selectedStatus);
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

    const index = this.listaCronograma.indexOf(this.cronograma);
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
    const crono = {};
    for (const prop in c) {
      crono[prop] = c[prop];
    }
    return crono as Cronograma;
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
