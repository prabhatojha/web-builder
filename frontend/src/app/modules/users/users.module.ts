import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetForgotPasswordComponent } from './reset-forgot-password/reset-forgot-password.component';
import { EasyLoginComponent } from './easy-login/easy-login.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [LoginComponent, SignupComponent, LoginSignupComponent,
    ForgotPasswordComponent, ResetForgotPasswordComponent, EasyLoginComponent],
  imports: [
    CommonModule,
    UsersRoutingModule
  ],
  exports: []
})
export class UsersModule { }
