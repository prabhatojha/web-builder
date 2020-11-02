import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ERROR_MSG } from 'src/app/constants/contants';
import { PickerItemModal } from 'src/app/models/pickers/picker-itemmodal';
import { PickerActions } from 'src/app/modules/builder/picker/picker.actions';
import { AppAnimations } from 'src/style/_angular-animations';
import { EventerService } from '../../services/eventer.service';

export class PhotoSettingsOption {
  label: string;
  value: string;
}

export class SettingOptionEvent {
  setting: PhotoSettingsOption;
  item: PickerItemModal;
}

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
  animations: [AppAnimations.SlideDown]
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
  @Input() settingOptions: PhotoSettingsOption[] = [];

  @Output() retry = new EventEmitter();
  @Output() settingOptionSelection = new EventEmitter<SettingOptionEvent>();

  ERROR_MSG = ERROR_MSG;
  showSettings = false;
  settingsLocationLeft = 0;
  settingsLocationTop = 0;

  constructor(protected eventer: EventerService) {
    super(eventer);
  }

  ngOnInit(): void {
  }

  onSettings(e, item) {
    e.stopPropagation();
    this.setOptionsLocation(e);
    this.toggleSettings(item);
  }

  setOptionsLocation(e) {
    const { top, left } = e.target.getClientRects()[0];
    this.settingsLocationLeft = left;
    this.settingsLocationTop = top + 23;
  }

  toggleSettings(item) {
    item._showSettings = !item._showSettings;
  }

  sendEvent(setting: PhotoSettingsOption, item: PickerItemModal) {
    this.settingOptionSelection.emit({
      setting,
      item
    });
  }
}
