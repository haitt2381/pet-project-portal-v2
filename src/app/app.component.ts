import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'pet-project-portal-v2';
  userSub!: Subscription
  isAuthenticated!: boolean;


  constructor(
    private _authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this._authService.autoLogin();

    this.userSub = this._authService.userLogged.subscribe(user => {
      this.isAuthenticated = !!user;
    })
  }
}
