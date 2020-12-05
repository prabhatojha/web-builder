import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';
import { APP_ROUTES } from 'src/app/constants/app-routes';
import { SnackbarService } from '../../shared/services/snackbar/snackbar.service';
import { UserModelFe, UserService } from '../user.service';

@Component({
  selector: 'app-reset-forgot-password',
  templateUrl: './reset-forgot-password.component.html',
  styleUrls: ['../signup/signup.component.scss']
})
export class ResetForgotPasswordComponent implements OnInit {

  APP_ROUTES = APP_ROUTES;
  token = '';

  userForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
  });

  isLoading: boolean;
  succeeded: boolean;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private snackbar: SnackbarService) {
  }

  ngOnInit(): void {
    const { token } = this.activatedRoute.snapshot.queryParams;
    this.token = token;
  }

  onSubmit(event) {
    event.preventDefault();
    this.isLoading = true;
    this.succeeded = false;
    const controls = this.userForm.controls;
    const user = {
      password: controls.password.value,
      token: this.token
    };
    this.userService.confirmResetPassword(user).pipe(delay(3000)).subscribe(t => {
      this.isLoading = false;
      this.snackbar.open('Password is updated succesfully', 0, true);
      this.succeeded = true;
    }, err => {
      this.isLoading = false;
      this.snackbar.open('Invalid token', 0, true);
    });
  }
}
