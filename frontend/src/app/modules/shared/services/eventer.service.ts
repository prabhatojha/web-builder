import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

export enum EventTypes {

  // Canvas related events
  CANVAS_PREVIEW,
  CANVAS_DOWNLOAD,
  CANVAS_ADD_ITEM,
  SELECT_ITEM_DIMENTION
}

export class EventModal {
  type: EventTypes;
  value: any;
}

@Injectable({
  providedIn: 'root'
})
export class EventerService {

  private subject = new Subject();
  private behaviourSubject = new BehaviorSubject(null);

  constructor() { }

  send(event: EventModal) {
    this.subject.next(event);
    this.behaviourSubject.next(event);
  }

  get(withInitialValue = false) {
    return withInitialValue ? this.behaviourSubject.asObservable() : this.subject.asObservable();
  }
}
