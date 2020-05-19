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
  }

  ngOnInit(): void {
    console.log(this.options);
  }

  onItemSelect(filter, e) {
    this.applyNodeChanges(filter, e);
  }

  onItemHover(filter, e) {
    this.applyNodeChanges(filter, e);
    filter.selectedValue = e.value;
  }

  applyNodeChanges(filter, selectedItem) {
    switch (filter.id) {
      case AVA_TOOLBAR_OPTIONS.FONT_FAMILY:
        this.selectedNode.style[filter.updateCss] = selectedItem.value;
        break;
      case AVA_TOOLBAR_OPTIONS.FONT_SIZE:
        this.selectedNode.style.fontFamily = selectedItem.value;
    }
  }
}
