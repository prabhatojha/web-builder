import { Component, OnInit } from '@angular/core';
import { CSS_PROPERTIES, CSS_PROPERTY_VALUES } from 'src/app/constants/css-constants';

@Component({
  selector: 'app-text-decoration',
  templateUrl: './text-decoration.component.html',
  styleUrls: ['./text-decoration.component.scss']
})
export class TextDecorationComponent implements OnInit {

  showPanel = false;

  letterSpacing = 0;
  lineHeight = 0;

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
    },
    {
      icon: 'format_bold',
      tooltip: 'Text Bold',
      style: CSS_PROPERTIES.FONT_WEIGHT,
      styleValue: CSS_PROPERTY_VALUES.FONT_WEIGHT_BOLD
    },
    {
      icon: 'format_bold',
      tooltip: 'Text Bold',
      style: CSS_PROPERTIES.FONT_WEIGHT,
      styleValue: CSS_PROPERTY_VALUES.FONT_WEIGHT_BOLD
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  toggleOptions() {
    this.showPanel = !this.showPanel;
  }

}
