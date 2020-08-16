import { Component, OnInit } from '@angular/core';
import { PickerActions } from '../picker.actions';
import { ImagesService } from '../image-picker/images.service';
import { EventerService } from 'src/app/modules/shared/services/eventer.service';
import { ElementsService } from './elements.service';

@Component({
  selector: 'app-elements-picker',
  templateUrl: './elements-picker.component.html',
  styleUrls: ['./elements-picker.component.scss']
})
export class ElementsPickerComponent extends PickerActions implements OnInit {

  constructor(public eventService: EventerService, public elementService: ElementsService) {
    super(eventService);
  }

  ngOnInit(): void {
  }

}
