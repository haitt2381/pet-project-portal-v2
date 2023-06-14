import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {HeaderTitleService} from "../../services/header-title.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  isOpenSidebar = false;
  isOpenDropdown = false;
  title: string = '';

  constructor(
    private authService: AuthService,
    // private sidebarService: SidebarService,
    private headerTitleService: HeaderTitleService,
  ) {
  }

  ngOnInit() {
    this.headerTitleService.title.subscribe(updatedTitle => {
      this.title = updatedTitle;
    });

    this.authService.userLogged.subscribe(user => {
      this.isAuthenticated = !!user;
    })
    // this.isOpenSidebar = this.sidebarService.drawerSidebar.opened;
  }

  ngOnDestroy() {
  }

  onLogout() {
    this.authService.logout();
  }

  onToggleSidebar() {
    // this.sidebarService.drawerSidebar.toggle();
    // this.isOpenSidebar = this.sidebarService.drawerSidebar.opened;
  }

  onToggleDropdownMenu() {
    this.isOpenDropdown = !this.isOpenDropdown;
    console.log(this.isOpenDropdown)
  }
}
