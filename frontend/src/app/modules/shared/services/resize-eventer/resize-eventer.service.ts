import { Injectable } from '@angular/core';
import { EventModal } from '../eventer.service';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResizeEventerService {

  private subject = new Subject();

  constructor() { }

  send() {
    this.subject.next();
  }

  get() {
    return this.subject.asObservable();
  }
}
