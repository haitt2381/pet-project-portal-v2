import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {UserComponent} from "./pages/user/user.component";
import {AuthGuard} from "./share/config/auth.guard";

const routes: Routes = [
  {path: '', redirectTo: 'user', pathMatch: 'full'},
  {path: 'auth', component: LoginComponent, pathMatch: 'full'},
  {
    path: 'user', canActivate: [AuthGuard], children: [
      {path: '', component: UserComponent},
      {path: 'new', component: UserComponent},
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
