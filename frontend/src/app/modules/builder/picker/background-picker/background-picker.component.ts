import { Component, OnInit, ElementRef, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { BackgroundService } from './background.service';
import { PickerActions } from '../picker.actions';
import { EventerService } from 'src/app/modules/shared/services/eventer.service';
import { Subscription } from 'rxjs';
import { CanvasElement } from 'src/app/models/canvas.element.model';
import { ELEMENT_TYPES, ERROR_MSG } from 'src/app/constants/contants';
import { CSS_PROPERTIES } from 'src/app/constants/css-constants';
import { PhotoSettingsOption, SettingOptionEvent } from 'src/app/modules/shared/component/photos/photos.component';
import { ImagesService } from '../image-picker/images.service';
import { PickerItemModal } from 'src/app/models/pickers/picker-itemmodal';
import { buildImagePickerItem } from '../image-picker/image.config';

@Component({
  selector: 'app-background-picker',
  templateUrl: './background-picker.component.html',
  styleUrls: ['./background-picker.component.scss']
})
export class BackgroundPickerComponent extends PickerActions implements OnChanges {

  @ViewChild('photoContainer', { static: true }) photoContainer: ElementRef;

  items = [];
  rows = [[], []];
  imagesSub: Subscription;
  scrollTimer = null;
  ERROR_MSG = ERROR_MSG;
  PHOTO_VAL = '1';
  settingOptions: PhotoSettingsOption[] = [{
    label: 'Use as photo',
    value: this.PHOTO_VAL
  }];

  constructor(public backgroundService: BackgroundService, protected eventer: EventerService,
    protected imageService: ImagesService) {
    super(eventer);
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  onNewSearch(query) {
    this.backgroundService.resetPage(query);
    this.getNextSet();
  }

  getNextSet() {
    this.backgroundService.getPhotos();
  }

  onColorSelect(color) {
    const canvasElement = new CanvasElement('div', {}, {}, []);
    canvasElement.type = ELEMENT_TYPES.BACKGROUND;
    canvasElement.style[CSS_PROPERTIES.BG] = color;
    this.onClick(null, {
      canvasElement
    });
  }

  onScroll(e) {
    this.backgroundService.onScroll(e);
  }

  onSettingSelection(event: SettingOptionEvent) {
    if (event.setting.value === this.PHOTO_VAL) {
      const item: PickerItemModal = event.item;
      const newImage = buildImagePickerItem(item.photo);
      super.onClick(null, newImage);
    }
  }
}
