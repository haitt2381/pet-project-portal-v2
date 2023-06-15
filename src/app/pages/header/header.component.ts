import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {HeaderTitleService} from "../../services/header-title.service";
import {SidebarService} from "../../services/sidebar.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  isOpenDropdown = false;
  title: string = '';

  constructor(
    private authService: AuthService,
    protected sidebarService: SidebarService,
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
  }

  ngOnDestroy() {
  }

  onLogout() {
    this.authService.logout();
  }

  onToggleDropdownMenu() {
    this.isOpenDropdown = !this.isOpenDropdown;
  }
}
