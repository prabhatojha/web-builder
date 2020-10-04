import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/modules/shared/services/http-service/http.service';
import { getLineItems, getShapeItems } from './elements.config';

@Injectable({
  providedIn: 'root'
})
export class ElementsService {

  elements = [];

  constructor(private httpService: HttpService) {
    this.addBoxItems();
  }

  addLineItems() {
    const item = {
      label: 'Lines',
      values: getLineItems()
    };

    this.elements.push(item);
  }

  addBoxItems() {
    const item = {
      label: 'Boxes',
      values: getShapeItems()
    };

    this.elements.push(item);
  }
}
