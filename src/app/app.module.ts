import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {LoginComponent} from "./pages/login/login.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { UserComponent } from './pages/user/user.component';
import {AuthInterceptorService} from "./share/config/auth-interceptor.service";
import {EmptyStateComponent} from "./share/UI/empty-state/empty-state.component";
import {PopConfirmComponent} from "./share/UI/pop-comfirm/pop-confirm/pop-confirm.component";
import {PaginationComponent} from "./share/UI/pagination/PaginationComponent.component";
import { SortDirective } from './share/directives/sort.directive';
import { CheckboxFilterComponent } from './share/UI/custom-filter/checkbox-filter/checkbox-filter.component';
import {UserEditComponent} from "./pages/user/user-edit/user-edit.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SidebarComponent,
    UserComponent,
    EmptyStateComponent,
    PopConfirmComponent,
    PaginationComponent,
    SortDirective,
    CheckboxFilterComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
