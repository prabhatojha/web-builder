import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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
  imagesSub: Subscription;

  constructor(private imageService: ImagesService) { }

  ngOnInit() {
    this.getInitialImages();
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  getInitialImages() {
    this.items = PICKERS[LEFT_MENU_CONST.PHOTO_MENU_ID];
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

  onSearch(query) {
    console.log('API call', query);
    // tslint:disable-next-line: no-unused-expression
    this.imagesSub && this.imagesSub.unsubscribe();
    this.imagesSub = this.imageService.getPhotos(query).subscribe(photos => {
      console.log(photos);
      this.processPhotos(photos);
    });
  }

  processPhotos(photos: Array<any>) {

    photos.forEach(photo => {
      const image = getImageElementInstance();
      image.id = photo.id;
      image.imageUrl = photo.thumb;
      image.canvaElement.attribute.src = photo.regular;
      this.items.push(image);
    });

    console.log(this.items);
  }
}
