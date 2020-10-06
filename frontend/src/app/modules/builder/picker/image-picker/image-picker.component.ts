import { Component, OnInit, OnChanges, SimpleChanges, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CONST_VAR, ERROR_MSG } from 'src/app/constants/contants';
import { ImagesService } from './images.service';
import { Subscription } from 'rxjs';
import { EventerService, EventTypes } from 'src/app/modules/shared/services/eventer.service';
import { PickerActions } from '../picker.actions';

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
  settingOptions = [];


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
}
