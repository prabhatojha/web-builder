import { Component, OnInit } from '@angular/core';
import { EventerService } from 'src/app/modules/shared/services/eventer.service';
import { PickerActions } from '../picker.actions';
import { UploadPickerService } from './upload-picker.service';

@Component({
  selector: 'app-upload-picker',
  templateUrl: './upload-picker.component.html',
  styleUrls: ['./upload-picker.component.scss']
})
export class UploadPickerComponent extends PickerActions implements OnInit {

  constructor(public uploadPickerService: UploadPickerService, protected eventer: EventerService) {
    super(eventer);
  }

  ngOnInit(): void {
  }

  onUpload(image) {
    this.uploadPickerService.add(image);
  }
}
