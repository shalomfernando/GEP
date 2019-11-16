import {Component, OnInit, ViewChild} from '@angular/core';
import {SidebarComponent} from '@syncfusion/ej2-angular-navigations';
import {User} from "@app/_models";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  @ViewChild('sidebar', {static: false})
  public sidebar: SidebarComponent;
  public width = '20%';
  public user: User;
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }
  public onCreated(args: any) {
    this.sidebar.element.style.visibility = '';
  }
  openClick(): void {
    this.sidebar.toggle();
  }

}
