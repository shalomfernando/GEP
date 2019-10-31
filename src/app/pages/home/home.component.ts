import {Component, OnInit} from '@angular/core';

import {Projetos, User} from '@app/_models';
import {ProjetoService, UserService} from '@app/_services';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
  loading = false;
  users: User[];
  data: any;
  ListProjeto: Projetos[];

  constructor(private userService: UserService, private projeto: ProjetoService) {
  }

  ngOnInit() {
    this.loading = true;
  }

}
