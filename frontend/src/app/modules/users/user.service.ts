import { Injectable } from '@angular/core';
import { API_ENDPOINT } from 'src/app/constants/api-endpoint';
import { HttpService } from '../shared/services/http-service/http.service';

export class UserModelFe {
  name?: string;
  email: string;
  password: string;
  constructor(name: string, email: string, password: string) {
    this.name = name && name.trim();
    this.email = email && email.trim().toLowerCase();
    this.password = password && password.trim();
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpService) { }

  signup(user: UserModelFe) {
    return this.httpService.post(API_ENDPOINT.USER_SIGNUP, user, {});
  }

  login(user: UserModelFe) {
    return this.httpService.post(API_ENDPOINT.USER_LOGIN, user, {});
  }

  resetPassword(user: UserModelFe) {
    return this.httpService.post(API_ENDPOINT.FORGOT_PASSWORD, user, {});
  }

  confirmResetPassword(user) {
    return this.httpService.post(API_ENDPOINT.CONFIRM_FORGOT_PASSWORD, user, {});
  }
}
