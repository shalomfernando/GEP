import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-novo',
  templateUrl: './menu-novo.component.html',
  styleUrls: ['./menu-novo.component.scss']
})
export class MenuNovoComponent implements OnInit {

  classApplied = false;
  constructor() { }

  ngOnInit() {
  }

  // $('#sidebarCollapse').on('click', function () {
  //   $('#sidebar').toggleClass('active');
  // });

  toggle() {
    // $('#sidebar').toggleClass('active');

  }
  toggleClass() {
    this.classApplied = !this.classApplied;
  }
}
