import { Component, Input, OnInit } from '@angular/core';
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

  constructor(protected eventer: EventerService) {
    super(eventer);
  }

  ngOnInit(): void {
  }

}
