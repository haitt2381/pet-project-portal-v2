import {Component, OnInit} from '@angular/core';
import {ResponseInfo} from "../../share/model/common/response-info.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from "../../share/services/my-error-state-matcher";
import {AlertService} from "../../share/services/alert.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {AuthResponseData} from "../../share/model/auth/auth-reponse-data.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLoginMode = true;
  isLoading = false;
  responseInfo: ResponseInfo | null = null;
  authForm: FormGroup = this._fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    }
  );
  matcher: MyErrorStateMatcher = new MyErrorStateMatcher(this.authForm);


  constructor(
    private _fb: FormBuilder,
    private _alertService: AlertService,
    private _authService: AuthService,
    private _router: Router,
  ) {
  }

  onSubmitLogin() {
    if (!this.authForm?.valid) {
      return;
    }

    const emailOrUsername = this.authForm.value.username;
    const password = this.authForm.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this._authService.login(emailOrUsername, password);
      authObs.subscribe({
          next: () => {
            this.isLoading = false;
            this._router.navigate(['/']).then();
          },
          error: err => {
            this.isLoading = false;
            this._alertService.handleErrors(err)
          }
        }
      );
    }


  }
}
