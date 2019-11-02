import {Component, OnInit} from '@angular/core';
import {User} from '@app/_models';

@Component({
  selector: 'app-menu-novo',
  templateUrl: './menu-novo.component.html',
  styleUrls: ['./menu-novo.component.scss']
})
export class MenuNovoComponent implements OnInit {

  classApplied = false;

  constructor() {
  }

  user: User;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user);
  }

  toggleClass() {
    this.classApplied = !this.classApplied;
  }
}
