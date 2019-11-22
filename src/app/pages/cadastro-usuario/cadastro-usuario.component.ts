import { Component, OnInit } from '@angular/core';
import {UserCadastro} from "@app/_models/UserCadastro";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent implements OnInit {

  usuarioCadastro: UserCadastro;

  constructor(private serviceCadastro: CadastroServices) { }

  ngOnInit() {
    this.usuarioCadastro = new UserCadastro();
  }

  onSubmit() {

  }

}
