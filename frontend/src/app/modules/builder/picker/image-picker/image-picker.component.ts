import { Component, OnInit, OnChanges, SimpleChanges, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CONST_VAR, ELEMENT_TYPES, ERROR_MSG } from 'src/app/constants/contants';
import { ImagesService } from './images.service';
import { Subscription } from 'rxjs';
import { EventerService, EventTypes } from 'src/app/modules/shared/services/eventer.service';
import { PickerActions } from '../picker.actions';
import { PhotoSettingsOption, SettingOptionEvent } from 'src/app/modules/shared/component/photos/photos.component';
import { CommonUtils } from 'src/app/utils/common.utils';
import { CSS_PROPERTIES } from 'src/app/constants/css-constants';
import { PickerItemModal } from 'src/app/models/pickers/picker-itemmodal';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss']
})
export class ImagePickerComponent extends PickerActions implements OnInit, OnChanges {

  items = [];
  rows = [[], []];
  imagesSub: Subscription;
  scrollTimer = null;
  ERROR_MSG = ERROR_MSG;
  BACKGROUND_VAL = '1';
  settingOptions: PhotoSettingsOption[] = [{
    label: 'Set as background',
    value: this.BACKGROUND_VAL
  }];


  @ViewChild('photoContainer', { static: true }) photoContainer: ElementRef;

  constructor(public imageService: ImagesService, protected eventer: EventerService) {
    super(eventer);
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  onNewSearch(query) {
    this.imageService.resetPage(query);
    this.getNextSet();
  }

  getNextSet() {
    this.imageService.getPhotos();
  }

  onScroll(e) {
    this.imageService.onScroll(e);
  }

  onOptionSelection(event: SettingOptionEvent) {
    console.log(event);

    if (event.setting.value === this.BACKGROUND_VAL) {
      const item: PickerItemModal = CommonUtils.cloneDeep(event.item);
      item.canvasElement.type = ELEMENT_TYPES.BACKGROUND;
      item.canvasElement.style = {
        [CSS_PROPERTIES.BG]: `url('${item.originalImgUrl}') center/cover`
      };
      super.onClick(null, item);
    }
  }
}
