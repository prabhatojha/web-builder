import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { delay } from 'rxjs/operators';
import { APP_ROUTES } from 'src/app/constants/app-routes';
import { AppAnimations } from 'src/style/_angular-animations';
import { SnackbarService } from '../../shared/services/snackbar/snackbar.service';
import { UserModelFe, UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [AppAnimations.ScaleInOut]
})
export class SignupComponent implements OnInit {

  APP_ROUTES = APP_ROUTES;
  userForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.max(30)]),
    email: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
  });

  isLoading: boolean;

  constructor(private userService: UserService, private snackbar: SnackbarService) { }

  ngOnInit(): void {
  }

  onSubmit(event) {
    event.preventDefault();
    this.isLoading = true;
    const controls = this.userForm.controls;
    const user = new UserModelFe(controls.name.value, controls.email.value, controls.password.value);
    this.userService.signup(user).pipe(delay(3000)).subscribe(t => {
      this.isLoading = false;
      this.snackbar.open('User created successfully', 0, true);
    }, err => {
      this.isLoading = false;
      this.snackbar.open('User already exist', 0, true);
    });
  }
}
