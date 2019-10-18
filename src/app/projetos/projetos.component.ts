import { Component, OnInit } from '@angular/core';
import {ProjetoService} from './projeto.service';
import {Projetos} from './projetos';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.scss']
})
export class ProjetosComponent implements OnInit {

  listaProjetos: Projetos[] = [];

  constructor(private projetoService: ProjetoService) {
     projetoService.ListarProjeto().subscribe( listarprojetos => this.listaProjetos = listarprojetos);
  }

  ngOnInit() {
  }

}
