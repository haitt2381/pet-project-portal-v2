import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {UserComponent} from "./pages/user/user.component";
import {AuthGuard} from "./share/config/auth.guard";
import {UserEditComponent} from "./pages/user/user-edit/user-edit.component";

const routes: Routes = [
  {path: '', redirectTo: 'user', pathMatch: 'full'},
  {path: 'auth', component: LoginComponent, pathMatch: 'full'},
  {
    path: 'user', canActivate: [AuthGuard], children: [
      {path: '', component: UserComponent},
      {path: 'new', component: UserEditComponent},
      {path: 'edit/:id', component: UserComponent}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
