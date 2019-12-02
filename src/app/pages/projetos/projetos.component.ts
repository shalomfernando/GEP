import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, Message, MessageService} from 'primeng/api';
import {PostProjeto, Projetos, PushProjeto} from '@app/_models';
import {ProjetoService} from '@app/_services';
import {Dashboard} from '@app/_models/Dashboard';
import {PageSettingsModel} from '@syncfusion/ej2-grids';
import {
  CommandModel,
  EditSettingsModel,
  DialogEditEventArgs,
  SaveEventArgs,
  ToolbarItems
} from '@syncfusion/ej2-angular-grids';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-projetos',
  templateUrl: 'projetos.component.html',
  styleUrls: ['./projetos.component.scss'],
  providers: [ConfirmationService]
})
export class ProjetosComponent implements OnInit {

  listaProjetos: Projetos[] = [];
  colunas: any[];
  projeto: Projetos;

  displayDialog: boolean;
  editProjetos: any;
  newProjeto: boolean;
  projetos: Projetos;

  msgs: Message[] = [];
  valorAsync: any;

  // novo grid
  data: Dashboard[];
  public filterSettings: Object;
  public pageOptions: PageSettingsModel;

  // @ts-ignore
  @ViewChild('orderForm')
  public orderForm: FormGroup;
  public editSettings: EditSettingsModel;
  public commands: CommandModel[];
  public toolbar: ToolbarItems[];

  // fim

  constructor(private projetoService: ProjetoService, private messageService: MessageService, private confirma: ConfirmationService) {
  }

  ngOnInit() {
    this.buscaProjetos();
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
      this.projeto = Object.assign(args.rowData);
    }
    if (args.requestType === 'save') {
      if (this.orderForm.valid) {
        if (this.projeto.id) {
          this.projetoService.atualizaProjeto(this.projeto, this.projeto.id).subscribe(
            () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Projeto atualizado com sucesso.'
              });
            },
            r => {
              this.messageService.add({
                severity: 'error',
                summary: 'Erro ao atualizar projeto.'
              });
            }
          );
        } else {
          this.projeto.idUser = JSON.parse(localStorage.getItem('currentUser')).id;
          this.projetoService.salvarProjeto(this.projeto).subscribe(() => {
              this.messageService.add({
                severity: 'success',
                summary: 'Projeto cadastrado com sucesso.',
                sticky: true
              });
            },
            r => {
              this.messageService.add({
                severity: 'error',
                summary: 'Erro ao cadastrar projeto.'
              })
            }
          );
        }
        this.buscaProjetos();
      } else {
        args.cancel = true;
      }
    }
    if (args.requestType === 'delete') {
      console.log(args.data[0].id);
      this.projetoService.deletarProjeto(args.data[0].id).subscribe(() =>{
          this.messageService.add({
            severity: 'success',
            summary: 'Projeto deletado com sucesso.',
            sticky: true
          });
        },
        r => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro ao deletar projeto.'
          });
      });
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


  buscaProjetos() {
    this.projetoService.ListarProjeto().subscribe(listarprojetos => this.listaProjetos = listarprojetos);
  }


  showDialogToAdd() {
    this.newProjeto = true;
    this.editProjetos = {};
    this.displayDialog = true;
  }

  save() {

    if (this.newProjeto) {
      const projeto = new PostProjeto(this.editProjetos);
      this.projetoService.salvarProjeto(projeto).subscribe();
    } else {
      const projeto = new PushProjeto(this.editProjetos);
      this.projetoService.atualizaProjeto(projeto, this.editProjetos.id).subscribe();
    }

    this.valorAsync = new Promise((resolver, reject) => {
      setTimeout(() => resolver(this.projetoService.ListarProjeto().subscribe(listaCronograma => {
        this.listaProjetos = listaCronograma;
      })), 1000);
    });

    this.editProjetos = null;
    this.displayDialog = false;
    this.showSalvo();
  }

  delete() {

    const index = this.listaProjetos.indexOf(this.projetos);
    this.listaProjetos = this.listaProjetos.filter((val, i) => i != index);
    this.editProjetos = null;
    this.displayDialog = false;
    this.projetoService.deletarProjeto(this.projetos.id);

    // atualizar a lista
    this.valorAsync = new Promise((resolver, reject) => {
      setTimeout(() => resolver(this.projetoService.ListarProjeto().subscribe(listaCronograma => {
        this.listaProjetos = listaCronograma;
      })), 1000);
    });
  }


  onRowSelect(event) {
    this.newProjeto = false;
    this.editProjetos = ProjetosComponent.cloneProjeto(event.data);
    this.projetos = this.editProjetos;
    this.displayDialog = true;
    console.log(this.editProjetos);
  }

//// Pega a linha clicada e inputa no editProjeto
  static cloneProjeto(c: Projetos): Projetos {
    const proje = {};
    for (const prop in c) {
      proje[prop] = c[prop];
    }
    return proje as Projetos;
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
