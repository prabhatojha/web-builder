import { Component, OnInit } from '@angular/core';
import { APP_ROUTES } from 'src/app/constants/app-routes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../signup/signup.component.scss']
})
export class LoginComponent implements OnInit {

  APP_ROUTES = APP_ROUTES;
  constructor() { }

  ngOnInit(): void {
  }

}
