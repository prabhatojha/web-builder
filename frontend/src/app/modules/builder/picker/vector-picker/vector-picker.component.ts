import { Component, OnInit, OnChanges, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
import { CONST_VAR } from 'src/app/constants/contants';
import { VectorService } from './vector.service';
import { Subscription } from 'rxjs';
import { PickerActions } from '../picker.actions';
import { EventerService } from 'src/app/modules/shared/services/eventer.service';

@Component({
  selector: 'app-vector-picker',
  templateUrl: './vector-picker.component.html',
  styleUrls: ['./vector-picker.component.scss']
})
export class VectorPickerComponent extends PickerActions implements OnInit, OnChanges {

  imagesSub: Subscription;
  scrollTimer = null;

  @ViewChild('photoContainer', { static: true }) photoContainer: ElementRef;

  constructor(public vectorService: VectorService, protected eventer: EventerService) {
    super(eventer);
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
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
