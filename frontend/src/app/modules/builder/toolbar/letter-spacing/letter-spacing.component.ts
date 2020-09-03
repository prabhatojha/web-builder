import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CSS_PROPERTIES } from 'src/app/constants/css-constants';
import { ResizeEventerService } from 'src/app/modules/shared/services/resize-eventer/resize-eventer.service';

@Component({
  selector: 'app-letter-spacing',
  templateUrl: './letter-spacing.component.html',
  styleUrls: ['./letter-spacing.component.scss']
})
export class LetterSpacingComponent implements OnInit {

  @Input() disabled;
  @Input() initialStyles = {};

  @Output() styleChange = new EventEmitter();
  @Output() styleChangeEnd = new EventEmitter();
  CSS_PROPERTIES = CSS_PROPERTIES;

  isVisible = false;
  LINE_HEIGHT = 1.5;

  constructor(private resizeEventer: ResizeEventerService) { }

  ngOnInit(): void {
  }

  toggle() {
    this.isVisible = !this.isVisible;
  }

  onLetterSpacing(e, permanent = false) {
    this.sendEvent(CSS_PROPERTIES.LETTER_SPACING, e.value, permanent);
  }

  onLineHeight(e, permanent = false) {
    this.sendEvent(CSS_PROPERTIES.LINE_HEIGHT, this.LINE_HEIGHT + (e.value / 10), permanent);

  }

  sendEvent(key, value, permanent) {
    if (permanent) {
      this.styleChangeEnd.emit({
        [key]: value
      });
    } else {
      this.styleChange.emit({
        [key]: value
      });
    }


    this.resizeEventer.send();
  }


  getLineHeight() {
    if (this.initialStyles && this.initialStyles[CSS_PROPERTIES.LINE_HEIGHT]) {
      return Math.floor((this.initialStyles[CSS_PROPERTIES.LINE_HEIGHT] - this.LINE_HEIGHT) * 10);
    }
    return 0;
  }
}
