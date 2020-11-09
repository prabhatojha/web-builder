import { Component, OnInit } from '@angular/core';
import { APP_ROUTES } from 'src/app/constants/app-routes';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  APP_ROUTES  = APP_ROUTES;
  constructor() { }

  ngOnInit(): void {
  }

}
