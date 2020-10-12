import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CSS_PROPERTIES } from 'src/app/constants/css-constants';
import { AppAnimations } from 'src/style/_angular-animations';

@Component({
  selector: 'app-text-alignment',
  templateUrl: './text-alignment.component.html',
  styleUrls: ['./text-alignment.component.scss'],
  animations: [AppAnimations.SlideDown]
})
export class TextAlignmentComponent implements OnInit {

  @Input() disabled: boolean;
  @Input() initialStyles = {};

  @Output() styleChange = new EventEmitter();


  isVisible = false;
  CSS_PROPERTIES = CSS_PROPERTIES;
  availableOtions = [
    { icon: 'format_align_left', cssValue: 'left' },
    { icon: 'format_align_center', cssValue: 'center' },
    { icon: 'format_align_justify', cssValue: 'justify' },
    { icon: 'format_align_right', cssValue: 'right' }
  ];
  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    this.isVisible = !this.isVisible;
  }

  sendEvent(key, value) {
    this.styleChange.emit({
      [key]: value
    });
  }
}
