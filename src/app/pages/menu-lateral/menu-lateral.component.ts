import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {MenuService} from '@app/_services';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: 'menu-lateral.component.html',
  styleUrls: ['menu-lateral.component.scss']
})
export class MenuLateralComponent implements OnInit {

  items: MenuItem[];

  constructor(private menuService: MenuService) {
  }
  ngOnInit() {
    this.menuService.ListarMenu().subscribe(x => this.items = x);
  }

}
