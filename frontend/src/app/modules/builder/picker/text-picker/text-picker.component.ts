import { Component, OnInit } from '@angular/core';
import { TextPickerService } from './text-picker.service';
import { PickerActions } from '../picker.actions';
import { EventerService } from 'src/app/modules/shared/services/eventer.service';
import { TextPickerTypes } from 'src/app/models/text.picker.model';

@Component({
  selector: 'app-text-picker',
  templateUrl: './text-picker.component.html',
  styleUrls: ['./text-picker.component.scss']
})
export class TextPickerComponent extends PickerActions implements OnInit {

  TextPickerTypes = TextPickerTypes;
  items = [];

  constructor(public textPickerService: TextPickerService, protected eventer: EventerService) {
    super(eventer);
  }

  ngOnInit(): void {
  }
}
