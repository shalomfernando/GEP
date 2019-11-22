import { Component, OnInit } from '@angular/core';
import {UserCadastro} from "@app/_models/UserCadastro";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CadastroServicesService} from "@app/_services/CadastroServices.service";
import {MessageService} from "primeng/api";


@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent implements OnInit {

  usuarioCadastro: UserCadastro;

  constructor(private serviceCadastro: CadastroServicesService, private messageService: MessageService) { }

  ngOnInit() {
    this.usuarioCadastro = new UserCadastro();
  }

  onSubmit(i: any) {
    this.serviceCadastro.SalvarCadastro(this.usuarioCadastro).subscribe(
      () => {
      this.messageService.add({
        severity: 'success',
        summary: 'Usuario cadastrado com sucesso.'
      });
    },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao cadastrar usuario.'
        });
      });
  }

}
