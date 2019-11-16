import {Component, OnInit} from '@angular/core';
import {ConfirmationService, Message, MessageService} from 'primeng/api';
import {PostProjeto, Projetos, PushProjeto} from '@app/_models';
import {ProjetoService} from '@app/_services';
import {Dashboard} from '@app/_models/Dashboard';
import {ProgressoHome} from '@app/_models/ProgressoHome';
import {PageSettingsModel} from '@syncfusion/ej2-grids';


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
  selectedCronograma: Projetos;
  newProjeto: boolean;
  projetos: Projetos;

  displayDelete: boolean;
  msgs: Message[] = [];
  valorAsync: any;

  // novo grid
  data: Dashboard[];
  progresso: ProgressoHome;
  // tslint:disable-next-line:ban-types
  public datas: Object[];
  // tslint:disable-next-line:ban-types
  public filterSettings: Object;
  public pageOptions: PageSettingsModel;

  // fim

  constructor(private projetoService: ProjetoService, private messageService: MessageService, private confirma: ConfirmationService) {
  }

  ngOnInit() {
    this.projetoService.ListarProjeto().subscribe(listarprojetos => this.listaProjetos = listarprojetos);
    this.filterSettings = {type: 'Menu'};
  }


  showDialogToAdd() {
    this.newProjeto = true;
    this.editProjetos = {};
    this.displayDialog = true;
  }

  save() {
    const proje = [...this.listaProjetos];

    console.log(this.newProjeto);

    if (this.newProjeto) {
      proje.push(this.editProjetos);

      console.log(this.editProjetos);
      const projeto = new PostProjeto(this.editProjetos);
      this.projetoService.salvarProjeto(projeto).subscribe();
    } else {
      proje[this.listaProjetos.indexOf(this.projetos)] = this.editProjetos;
      const projeto = new PushProjeto(this.editProjetos);
      this.projetoService.atualizaProjeto(projeto, this.editProjetos.id).subscribe();
    }

    this.valorAsync = new Promise((resolver, reject) => {
      setTimeout(() => resolver(this.projetoService.ListarProjeto().subscribe(listaCronograma => {
        this.listaProjetos = listaCronograma;
      })), 1000);
    });

    this.listaProjetos = proje;
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
    this.editProjetos = this.cloneProjeto(event.data);
    this.projetos = this.editProjetos;
    this.displayDialog = true;
    console.log(this.editProjetos);
  }

  //// Pega a linha clicada e inputa no editProjeto
  cloneProjeto(c: Projetos): Projetos {
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
