import { Component, OnInit } from '@angular/core';
import {Projetos} from '../../model/projetos';
import {ProjetoService} from '../../service/projeto.service';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.scss']
})
export class ProjetosComponent implements OnInit {

  listaProjetos: Projetos[] = [];

  constructor(private projetoService: ProjetoService) {
  }

  ngOnInit() {
    this.projetoService.ListarProjeto().subscribe( listarprojetos => this.listaProjetos = listarprojetos);
  }

}
