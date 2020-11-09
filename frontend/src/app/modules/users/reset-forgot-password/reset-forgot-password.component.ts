import { Component, OnInit } from '@angular/core';
import { APP_ROUTES } from 'src/app/constants/app-routes';

@Component({
  selector: 'app-reset-forgot-password',
  templateUrl: './reset-forgot-password.component.html',
  styleUrls: ['../signup/signup.component.scss']
})
export class ResetForgotPasswordComponent implements OnInit {

  APP_ROUTES = APP_ROUTES;
  constructor() { }

  ngOnInit(): void {
  }

}
