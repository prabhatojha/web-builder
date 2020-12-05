import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { APP_ROUTES } from 'src/app/constants/app-routes';
import { QUERY_PARAMS } from 'src/app/constants/query-params';
import { AppAnimations } from 'src/style/_angular-animations';
import { AuthService } from '../../shared/services/auth/auth.service';
import { SnackbarService } from '../../shared/services/snackbar/snackbar.service';
import { UserModelFe, UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../signup/signup.component.scss'],
  animations: [AppAnimations.ScaleInOut]
})
export class LoginComponent implements OnInit {

  APP_ROUTES = APP_ROUTES;
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
  });

  isLoading: boolean;

  constructor(private userService: UserService, private snackbar: SnackbarService,
    private activatedRoute: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(event) {
    event.preventDefault();
    this.isLoading = true;
    const controls = this.userForm.controls;
    const user = new UserModelFe(null, controls.email.value, controls.password.value);
    this.userService.login(user).subscribe(t => {
      this.onSuccess();
    }, err => {
      this.isLoading = false;
      this.snackbar.open(err.error.errors.join(), 0, true);
    });
  }

  onSuccess() {
    this.authService.login();
    const redirectTo = this.activatedRoute.snapshot.queryParams[QUERY_PARAMS.redirect];
    this.router.navigateByUrl(redirectTo || APP_ROUTES.DASHBOARD);
  }
}
