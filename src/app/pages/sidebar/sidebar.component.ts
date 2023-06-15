import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {SidebarService} from "../../services/sidebar.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy{
  isAuthenticated!: boolean;
  isOpenedSidebar!: boolean;
  userSub!: Subscription;

  constructor(
    protected sidebarService: SidebarService,
    private _authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.sidebarService.isOpenedSidebar.subscribe(isOpened => {
      this.isOpenedSidebar = isOpened;
    })
    this.userSub = this._authService.userLogged.subscribe(user => {
      this.isAuthenticated = !!user;
    })
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
