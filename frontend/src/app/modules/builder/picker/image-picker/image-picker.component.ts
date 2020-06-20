import { Component, OnInit, OnChanges, SimpleChanges, ElementRef, ViewChild, HostListener } from '@angular/core';
import { PICKERS } from '../picker.mock';
import { LEFT_MENU_CONST } from '../picker.config';
import { CONST_VAR } from 'src/app/constants/contants';
import { ImagesService } from './images.service';
import { Subscription } from 'rxjs';
import { getImageElementInstance } from '../../canvas/canvas.config';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss']
})
export class ImagePickerComponent implements OnInit, OnChanges {

  items = [];
  rows = [[], []];
  imagesSub: Subscription;
  scrollTimer = null;

  @ViewChild('photoContainer', { static: true }) photoContainer: ElementRef;

  constructor(public imageService: ImagesService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  dragStart(ev, item) {
    const bound = ev.target.getBoundingClientRect();

    ev.dataTransfer.setData(CONST_VAR.PICKER_ITEM,
      JSON.stringify({
        left: ev.clientX - bound.left,
        top: ev.clientY - bound.top,
        item
      }));
  }

  onNewSearch(query) {
    this.imageService.resetPage(query);
    this.getNextSet();
  }

  getNextSet() {
    this.imageService.getPhotos();
  }

  onScroll(e) {
    if (this.imageService.isLoading) {
      return;
    }

    if (this.scrollTimer !== null) {
      clearTimeout(this.scrollTimer);
    }
    this.scrollTimer = setTimeout(() => {

      const el = this.photoContainer.nativeElement;
      if ((el.scrollTop + el.offsetHeight + 50) > el.scrollHeight) {
        this.imageService.getPhotos();
      }

    }, 50);
  }
}
