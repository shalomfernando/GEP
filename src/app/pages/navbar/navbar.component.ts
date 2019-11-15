import {Component, OnInit, ViewChild} from '@angular/core';
import {SidebarComponent} from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  @ViewChild('sidebar', {static: false})
  public sidebar: SidebarComponent;
  public width = '290px';

  ngOnInit() {
  }
  public onCreated(args: any) {
    this.sidebar.element.style.visibility = '';
  }
  openClick(): void {
    this.sidebar.toggle();
  }

}
