import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnChanges {

  @Input() selectedOpacity = 1;
  @Output() slideChange = new EventEmitter();
  @Output() slideStop = new EventEmitter();

  selectedValue = 100;
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.selectedValue = this.selectedOpacity ? this.selectedOpacity * 100 : 100;
    console.log('Opacity', this.selectedValue);
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
