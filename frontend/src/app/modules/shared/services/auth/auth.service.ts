import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn: boolean;
  JWT_KEY = '_j';
  jwt: any;

  constructor() {
    this.login();
  }

  isAuthenticated() {
    return this.isLoggedIn;
  }

  isValidToken(expTime) {
    return (new Date(expTime * 1000)).getTime() > Date.now();
  }

  parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  login() {
    const cookies = key => ((new RegExp((key || '=') + '=(.*?); ', 'gm')).exec(document.cookie + '; ') || ['', null])[1];
    this.jwt = this.parseJwt(cookies(this.JWT_KEY));
    this.isLoggedIn = this.isValidToken(this.jwt.exp);
  }
}
