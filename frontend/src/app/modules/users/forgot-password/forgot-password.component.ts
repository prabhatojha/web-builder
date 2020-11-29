import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { delay } from 'rxjs/operators';
import { APP_ROUTES } from 'src/app/constants/app-routes';
import { AppAnimations } from 'src/style/_angular-animations';
import { SnackbarService } from '../../shared/services/snackbar/snackbar.service';
import { UserModelFe, UserService } from '../user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../signup/signup.component.scss'],
  animations: [AppAnimations.ScaleInOut]
})
export class ForgotPasswordComponent implements OnInit {

  APP_ROUTES = APP_ROUTES;
  isLoading: boolean;
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$')])
  });

  succeeded: boolean;

  constructor(public userService: UserService, public snackbar: SnackbarService) { }

  ngOnInit(): void {
  }

  onSubmit(event) {
    event.preventDefault();
    this.isLoading = true;
    this.succeeded = false;
    const controls = this.userForm.controls;
    const user = new UserModelFe(null, controls.email.value, null);
    this.userService.resetPassword(user).pipe(delay(3000)).subscribe(t => {
      this.isLoading = false;
      this.succeeded = true;
    }, err => {
      this.isLoading = false;
      this.snackbar.open('User doesn\'t exist', 0, true);
    });
  }

}
