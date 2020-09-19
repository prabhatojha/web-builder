import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CSS_PROPERTIES } from 'src/app/constants/css-constants';

@Component({
  selector: 'app-element-layering',
  templateUrl: './element-layering.component.html',
  styleUrls: ['./element-layering.component.scss']
})
export class ElementLayeringComponent implements OnInit {

  @Output() styleChange = new EventEmitter();

  disabled = false;
  isVisible = false;
  CSS_PROPERTIES = CSS_PROPERTIES;

  availableOtions = [
    { icon: 'first_page', cssValue: 'left' },
    { icon: 'keyboard_arrow_left', cssValue: 'center' },
    { icon: 'keyboard_arrow_right', cssValue: 'justify' },
    { icon: 'last_page', cssValue: 'right' }
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
