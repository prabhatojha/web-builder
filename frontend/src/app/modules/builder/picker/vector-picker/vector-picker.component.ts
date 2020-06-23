import { Component, OnInit, OnChanges, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
import { CONST_VAR } from 'src/app/constants/contants';
import { VectorService } from './vector.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vector-picker',
  templateUrl: './vector-picker.component.html',
  styleUrls: ['./vector-picker.component.scss']
})
export class VectorPickerComponent implements OnInit, OnChanges {

  imagesSub: Subscription;
  scrollTimer = null;

  @ViewChild('photoContainer', { static: true }) photoContainer: ElementRef;

  constructor(public vectorService: VectorService) { }

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
    this.vectorService.resetPage(query);
    this.getNextSet();
  }

  getNextSet() {
    this.vectorService.getPhotos();
  }

  onScroll(e) {
    if (this.vectorService.isLoading) {
      return;
    }

    if (this.scrollTimer !== null) {
      clearTimeout(this.scrollTimer);
    }
    this.scrollTimer = setTimeout(() => {

      const el = this.photoContainer.nativeElement;
      if ((el.scrollTop + el.offsetHeight + 50) > el.scrollHeight) {
        this.vectorService.getPhotos();
      }

    }, 50);
  }
}
