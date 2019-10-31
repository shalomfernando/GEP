import {Component, OnInit} from '@angular/core';
import {ConfirmationService, Message, MessageService} from 'primeng/api';
import {PostProjeto, Projetos, PushProjeto} from '@app/_models';
import {ProjetoService} from '@app/_services';


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

  constructor(private projetoService: ProjetoService, private messageService: MessageService, private confirma: ConfirmationService) {
  }

  ngOnInit() {
    this.projetoService.ListarProjeto().subscribe(listarprojetos => this.listaProjetos = listarprojetos);

    this.colunas = [
      {field: 'nome', header: 'Nome Projeto'},
      {field: 'sigla', header: 'Sigla'},
      {field: 'descricao', header: 'Descrição'},
      {field: 'objetivo', header: 'Objetivo'}
    ];
  }


  showDialogToAdd() {
    this.newProjeto = true;
    this.editProjetos = {};
    this.displayDialog = true;
  }

  save() {
    let proje = [...this.listaProjetos];

    console.log(this.newProjeto);

    if (this.newProjeto) {
      proje.push(this.editProjetos);

      console.log(this.editProjetos);
      let projeto = new PostProjeto(this.editProjetos);
      this.projetoService.salvarProjeto(projeto).subscribe();
    } else {
      proje[this.listaProjetos.indexOf(this.projetos)] = this.editProjetos;
      let projeto = new PushProjeto(this.editProjetos);
      this.projetoService.atualizaProjeto(projeto, this.editProjetos.id).subscribe();
    }

    this.listaProjetos = proje;
    this.editProjetos = null;
    this.displayDialog = false;
    this.showSalvo();
  }

  delete() {

    let index = this.listaProjetos.indexOf(this.projetos);
    this.listaProjetos = this.listaProjetos.filter((val, i) => i != index);
    this.editProjetos = null;
    this.displayDialog = false;

    this.projetoService.deletarProjeto(this.projetos.id);

  }


  onRowSelect(event) {
    this.newProjeto = false;
    this.editProjetos = this.cloneProjeto(event.data);
    this.displayDialog = true;
  }

  //// Pega a linha clicada e inputa no editProjeto
  cloneProjeto(c: Projetos): Projetos {
    let proje = {};
    for (let prop in c) {
      proje[prop] = c[prop];
    }
    return <Projetos>proje;
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
