import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, ElementRef } from '@angular/core';
import { AVA_TOOLBAR_OPTIONS, FilterConfig } from './toolbar.config';
import { FILTER_TYPES } from '../../../constants/contants';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnChanges {

  @Input() options = [];
  @Input() selectedNode: any;
  @Input() selectedItem: any;

  @Output() hoverItem = new EventEmitter();
  @Output() selectItem = new EventEmitter();

  filterConfig = [];
  FILTER_TYPES = FILTER_TYPES;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.options && this.options) {
      this.filterConfig = FilterConfig.filter(conf => this.options.includes(conf.id));
    }

    if (changes.selectedItem && this.selectedItem) {
      this.setInitialState(this.selectedItem.canvaElement.style);
    }
  }

  ngOnInit(): void {
    console.log(this.options);
  }

  setInitialState(style) {
    if (style) {
      this.filterConfig.forEach(filter => {
        filter.selectedValue = style[filter.updateCss];
      });
    }
  }

  onItemSelect(filter, e) {
    this.applyNodeChanges(filter, e);
  }

  onItemHover(filter, e) {
    console.log(this.selectedItem);
    this.applyNodeChanges(filter, e);
    filter.selectedValue = e.value;
  }

  onCloseWithoutSelect(filter) {
    const style = this.selectedItem.canvaElement.style;
    this.selectedNode.style[filter.updateCss] = style[filter.updateCss];
    filter.selectedValue = style[filter.updateCss];
  }

  applyNodeChanges(filter, selectedItem) {
    switch (filter.id) {
      case AVA_TOOLBAR_OPTIONS.FONT_FAMILY:
      case AVA_TOOLBAR_OPTIONS.FONT_SIZE:
      case AVA_TOOLBAR_OPTIONS.FONT_WEIGHT_BOLD:
        this.selectedNode.style[filter.updateCss] = selectedItem.value;
        break;
    }
  }

  onBoldClick(filter) {
    filter.isSelected = !filter.isSelected;
    this.applyNodeChanges(filter, { value: (filter.isSelected ? 'bold' : 'normal') });
  }

  onItalicClick(filter) {
    filter.isSelected = !filter.isSelected;
    this.applyNodeChanges(filter, { value: (filter.isSelected ? 'italic' : 'normal') });
  }
}
