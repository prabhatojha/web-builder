import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ERROR_MSG } from 'src/app/constants/contants';
import { PickerActions } from 'src/app/modules/builder/picker/picker.actions';
import { EventerService } from '../../services/eventer.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent extends PickerActions implements OnInit {

  @Input() photos = [];
  @Input() photoAsBackground = false;
  @Input() boxShadow = false;
  @Input() twoImgInRow = true;
  @Input() fixHeight = '130px';
  @Input() endOfResult = false;
  @Input() isLoading = true;
  @Input() isError = false;
  @Input() handleErrorLoading = true;

  @Output() retry = new EventEmitter();

  ERROR_MSG = ERROR_MSG;

  constructor(protected eventer: EventerService) {
    super(eventer);
  }

  ngOnInit(): void {
  }

}
