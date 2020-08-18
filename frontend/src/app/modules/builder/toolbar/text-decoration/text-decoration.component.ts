import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CSS_PROPERTIES, CSS_PROPERTY_VALUES } from 'src/app/constants/css-constants';

@Component({
  selector: 'app-text-decoration',
  templateUrl: './text-decoration.component.html',
  styleUrls: ['./text-decoration.component.scss']
})
export class TextDecorationComponent implements OnInit {

  @Input() initialStyles = {};

  @Output() styleChange = new EventEmitter();

  showPanel = false;

  CSS_PROPERTIES = CSS_PROPERTIES;
  CSS_PROPERTY_VALUES = CSS_PROPERTY_VALUES;

  LINE_HEIGHT = 1.5;

  textStyles = [
    {
      icon: 'format_bold',
      tooltip: 'Text Bold',
      style: CSS_PROPERTIES.FONT_WEIGHT,
      styleValue: CSS_PROPERTY_VALUES.FONT_WEIGHT_BOLD
    },
    {
      icon: 'format_italic',
      tooltip: 'Text Italic',
      style: CSS_PROPERTIES.FONT_ITALIC,
      styleValue: CSS_PROPERTY_VALUES.FONT_ITALIC
    }
  ];

  textAlignment = [
    { icon: 'format_align_left', styleValue: CSS_PROPERTY_VALUES.TEXT_ALIGN_LEFT },
    { icon: 'format_align_center', styleValue: CSS_PROPERTY_VALUES.TEXT_ALIGN_CENTER },
    { icon: 'format_align_justify', styleValue: CSS_PROPERTY_VALUES.TEXT_ALIGN_JUSTIFY },
    { icon: 'format_align_right', styleValue: CSS_PROPERTY_VALUES.TEXT_ALIGN_RIGHT }
  ];

  constructor() { }

  ngOnInit(): void {
    console.log(this.initialStyles);
  }

  toggleOptions() {
    this.showPanel = !this.showPanel;
  }

  applyTextStyle(txtStyle) {
    if (this.initialStyles[txtStyle.style] === txtStyle.styleValue) {
      this.sendEvent(txtStyle.style, ''); // removing the style
    } else {
      this.sendEvent(txtStyle.style, txtStyle.styleValue);
    }

  }

  onLetterSpacing(e) {
    this.sendEvent(CSS_PROPERTIES.LETTER_SPACING, e.value);
  }

  onLineHeight(e) {
    this.sendEvent(CSS_PROPERTIES.LINE_HEIGHT, this.LINE_HEIGHT + (e.value / 10));
  }

  sendEvent(key, value) {
    this.styleChange.emit({
      [key]: value
    });
  }


  getLineHeight() {
    if (this.initialStyles && this.initialStyles[CSS_PROPERTIES.LINE_HEIGHT]) {
      return Math.floor((this.initialStyles[CSS_PROPERTIES.LINE_HEIGHT] - this.LINE_HEIGHT) * 10);
    }
    return 0;
  }
}
