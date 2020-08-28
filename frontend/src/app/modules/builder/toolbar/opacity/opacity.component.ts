import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './opacity.component.html',
  styleUrls: ['./opacity.component.scss']
})
export class OpacityComponent implements OnChanges {

  @Input() selectedOpacity = 1;
  @Input() disabled;

  @Output() slideChange = new EventEmitter();
  @Output() slideStop = new EventEmitter();
  @Output() closeSlider = new EventEmitter();

  selectedValue = 100;
  isOpacitySelectorOpen = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.selectedValue = this.selectedOpacity ? Math.floor(this.selectedOpacity * 100) : 100;
  }

  onValueChange(e) {
    if (e) {
      this.slideChange.emit(e.value / 100);
    }
  }

  onSliderStop(e) {
    if (e) {
      this.slideStop.emit(e.value / 100);
    }
  }
}
