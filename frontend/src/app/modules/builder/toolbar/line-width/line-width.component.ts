import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CSS_PROPERTIES } from 'src/app/constants/css-constants';
import { CanvasElement } from 'src/app/models/canvas.element.model';
import { AppAnimations } from 'src/style/_angular-animations';

@Component({
  selector: 'app-line-width',
  templateUrl: './line-width.component.html',
  styleUrls: ['./line-width.component.scss'],
  animations: [AppAnimations.InOut]
})
export class LineWidthComponent implements OnChanges {

  @Input() selectedOpacity = 1;
  @Input() disabled;
  @Input() selectedCanvasElement: CanvasElement;

  @Output() slideChange = new EventEmitter();
  @Output() slideStop = new EventEmitter();
  @Output() closeSlider = new EventEmitter();

  selectedValue = 100;
  isOpacitySelectorOpen = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.selectedValue = this.selectedOpacity ? Math.floor(this.selectedOpacity * 100) : 100;

    if (changes.selectedCanvasElement && this.selectedCanvasElement) {
      this.selectedValue = this.getParsedValue();
    }
  }

  getParsedValue() {
    return parseInt(this.selectedCanvasElement.children[0].style[CSS_PROPERTIES.BORDER_TOP], 10);
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
