import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ComboBoxComponent} from '@syncfusion/ej2-angular-dropdowns';
import {Query, DataManager} from '@syncfusion/ej2-data';
import {
  AtualizarCronograma,
  Cronograma,
  PostTarefa,
  Projetos,
  PushTarefa,
  SalvarCronograma,
  Tarefa,
  User
} from '@app/_models';
import {CronogramaService, ProjetoService, TarefaService, UserService} from '@app/_services';
import {first} from 'rxjs/operators';
import {ApontamentoTarefa} from "@app/_models/tarefa/apontamento-tarefa";
import {ApontamentoService} from "@app/_services/apontamento.service";
import {Dashboard} from "@app/_models/Dashboard";
import {ProgressoHome} from "@app/_models/ProgressoHome";
import {PageSettingsModel} from "@syncfusion/ej2-grids";
import {FormGroup} from "@angular/forms";

import {
  CommandModel,
  EditSettingsModel,
  DialogEditEventArgs,
  SaveEventArgs,
  ToolbarItems
} from '@syncfusion/ej2-angular-grids';


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

  // @ts-ignore
  @ViewChild('projetosCmb')
  public projetosCmb: ComboBoxComponent;
  // @ts-ignore
  @ViewChild('cronogramaCmb')
  public cronogramaCmb: ComboBoxComponent;

  addNewProjeto: boolean = false;

  // fim

  constructor(private tarefaService: TarefaService,
              private cronogramaService: CronogramaService,
              private projetoService: ProjetoService,
              private userService: UserService,
              private messageService: MessageService,
              private confirma: ConfirmationService,
              private apont: ApontamentoService) {
  }

  ngOnInit() {
    this.buscaTarefa();
    this.buscaUsuario();
    this.tarefaService.listarStatus().subscribe(status => this.listaStatus = status);
    this.cronogramaService.GET().subscribe(cronograma => this.listaCronograma = cronograma);
    this.projetoService.ListarProjeto().subscribe(projeto => this.listaProjeto = projeto);


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

  }

  actionBegin(args: SaveEventArgs): void {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      this.tarefa = Object.assign(args.rowData);
      if (args.requestType == 'add') {
        this.addNewProjeto = true;
      }else{
        this.addNewProjeto = false;
      }
    }

    if (args.requestType === 'save') {
      if (this.orderForm.valid) {
        if (this.tarefa.id) {
          this.tarefaService.atualizarTarefa(this.tarefa, this.tarefa.id).subscribe(
            () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Tarefa atualizado com sucesso.'
              });
            },
            r => {
              this.messageService.add({
                severity: 'error',
                summary: 'Erro ao atualizar tarefa.'
              });
            }
          );
          this.buscaTarefa();
        } else {
          this.tarefa.idUser = JSON.parse(localStorage.getItem('currentUser')).id;
          console.log(this.tarefa);
          this.tarefaService.SalvarTarefa(this.tarefa).subscribe(() => {
              this.messageService.add({
                severity: 'success',
                summary: 'Tarefa cadastrado com sucesso.'
              });
            },
            r => {
              this.messageService.add({
                severity: 'error',
                summary: 'Erro ao cadastrar tarefa.'
              })
            }
          );
          this.buscaTarefa();
        }
      } else {
        args.cancel = true;
      }
    }
    if (args.requestType === 'delete') {
      this.tarefaService.deletarCronograma(args.data[0].id).subscribe(()=>{
          this.messageService.add({
            severity: 'success',
            summary: 'Tarefa deletada com sucesso.'
          });
        },
        r => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro ao deletar tarefa.'
          })
      });
    }
  }

  actionComplete(args: DialogEditEventArgs): void {
    if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
      args.form.ej2_instances[0].rules = {};
      // Set initail Focus
    }
  }

  buscaTarefa() {
    this.tarefaService.listar().subscribe(listaTarefas => {
      this.listaTarefas = listaTarefas;
    });
  }

  buscaUsuario() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.loading = false;
      this.users = users;
    });
  }

  public mudancaProjeto(): void {
    let tempQuery: Query = new Query().where('id_projeto', 'equal', this.projetosCmb.value);
    this.cronogramaCmb.query = tempQuery;
    this.cronogramaCmb.enabled = true;
    this.cronogramaCmb.text = null;
    this.cronogramaCmb.dataBind();
  }
}
