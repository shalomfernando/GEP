import { Component, OnInit } from '@angular/core';


import {MenuItem} from 'primeng/api';
@Component({
  selector: 'app-style-default',
  templateUrl: './style-default.component.html',
  styleUrls: ['./style-default.component.scss']
})
export class StyleDefaultComponent implements OnInit {

  constructor() { }


  items: MenuItem[];

  ngOnInit() {
    this.items = [
      {label: 'New', icon: 'pi pi-fw pi-plus'},
      {label: 'Open', icon: 'pi pi-fw pi-download'},
      {label: 'Undo', icon: 'pi pi-fw pi-refresh'}
    ];
  }

}
