import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

export class MyHttpRequest {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  withCredentials?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  get(url, options?: MyHttpRequest) {
    return this.http.get(url, options);
  }

  post(url, body: any, options?: MyHttpRequest) {
    return this.http.post(url, body, options);
  }

  put(url, body: any, options?: MyHttpRequest) {
    return this.http.put(url, body, options);
  }
}
