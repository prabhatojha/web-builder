import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { APP_ROUTES } from '../../../constants/app-routes';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss']
})
export class LoginSignupComponent implements OnInit, OnDestroy {
  @Input() type: string;
  @Input() isLogin: boolean;

  sub: Subscription;
  APP_ROUTES = APP_ROUTES;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.activatedRoute
      .data
      .subscribe(v => {
        console.log(v);
        this.type = v.type;
        this.isLogin = v.isLogin;
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
