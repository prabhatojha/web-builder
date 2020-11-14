import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { delay } from 'rxjs/operators';
import { APP_ROUTES } from 'src/app/constants/app-routes';
import { UserModelFe, UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../signup/signup.component.scss']
})
export class LoginComponent implements OnInit {

  APP_ROUTES = APP_ROUTES;
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
  });

  isLoading: boolean;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(event) {
    event.preventDefault();
    this.isLoading = true;
    const controls = this.userForm.controls;
    const user = new UserModelFe(null, controls.email.value, controls.password.value);
    this.userService.login(user).pipe(delay(3000)).subscribe(t => {
      this.isLoading = false;
    }, err => {
      this.isLoading = false;
    });
  }
}
