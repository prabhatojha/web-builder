import { Component, OnInit } from '@angular/core';
import { PICKERS } from '../picker.mock';
import { TextPickerTypes } from './text-picker.config';
import { CONST_VAR } from 'src/app/constants/contants';
import { TextPickerService } from './text-picker.service';
import { PickerActions } from '../picker.actions';
import { EventerService } from 'src/app/modules/shared/services/eventer.service';

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
