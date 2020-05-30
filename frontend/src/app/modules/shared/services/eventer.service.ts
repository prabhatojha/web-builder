import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

export enum EventTypes {
  CANVAS_PREVIEW,
  CANVAS_DOWNLOAD
}

export class EventModal {
  type: EventTypes;
  value: any;
}

@Injectable({
  providedIn: 'root'
})
export class EventerService {

  subject = new Subject();
  behaviourSubject = new BehaviorSubject(null);

  constructor() { }

  send(event: EventModal) {
    this.subject.next(event);
    this.behaviourSubject.next(event);
  }

  get(withInitialValue = false) {
    return withInitialValue ? this.behaviourSubject.asObservable() : this.subject.asObservable();
  }
}
