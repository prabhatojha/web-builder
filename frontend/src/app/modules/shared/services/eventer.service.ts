import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

export enum EventTypes {
  CANVAS_PREVIEW,
  CANVAS_DOWNLOAD,
  CANVAS_ADD_ITEM,
  SELECT_ITEM_DIMENTION,
  UPDATE_DIRECTION_HANLDES,
  UPDATE_RECT,
  GROUP_ITEMS,
  UNGROUP_ITEMS
}

export class EventModal {
  type: EventTypes;
  value?: any;
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
