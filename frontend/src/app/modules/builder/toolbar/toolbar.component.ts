import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, ElementRef } from '@angular/core';
import { AVA_TOOLBAR_OPTIONS, FilterConfig } from './toolbar.config';
import { FILTER_TYPES } from '../../../constants/contants';
import { CommonUtils } from '../../../utils/common.utils';


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
  AVA_TOOLBAR_OPTIONS = AVA_TOOLBAR_OPTIONS;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.options && this.options) {
      this.filterConfig = this.getFilterConfig();
    }

    if (changes.selectedItem && this.selectedItem) {
      this.setInitialState(this.getOriginalItemStyle());
    }
  }

  ngOnInit(): void {

  }

  getOriginalItemStyle() {
    return this.selectedItem.canvaElement.style;
  }

  getFilterConfig() {
    return CommonUtils.cloneDeep(FilterConfig.filter(conf => this.options.includes(conf.id)));
  }

  setInitialState(style) {
    if (style) {
      this.filterConfig.forEach(filter => {
        this.changeSelectedValue(filter, style[filter.updateCss]);
      });
    }
  }

  onFontFamilySelect(filter, e, updateSelectedItem) {
    this.changeSelectedValue(filter, e.value);
    this.applyNodeChanges(filter, e.value);

    if (updateSelectedItem) {
      this.applySelectedItemChanes(filter, e.value);
    }
  }

  onFontSizeSelect(filter, e, updateSelectedItem) {
    this.changeSelectedValue(filter, e.value);
    this.applyNodeChanges(filter, e.value);

    if (updateSelectedItem) {
      this.applySelectedItemChanes(filter, e.value);
    }
  }

  onCloseWithoutSelect(filter) {
    const style = this.getOriginalItemStyle();
    this.applyNodeChanges(filter, style[filter.updateCss]);
    this.changeSelectedValue(filter, style[filter.updateCss]);
  }

  changeSelectedValue(filter, value) {
    filter.selectedValue = filter.id === AVA_TOOLBAR_OPTIONS.FONT_SIZE ? parseInt(value, 10) : value;
  }

  setFontSize(filter, value) {
    this.onFontSizeSelect(filter, { value: value + 'px' }, true);
  }

  applySelectedItemChanes(filter, value) {
    const style = this.getOriginalItemStyle();
    style[filter.updateCss] = value;
  }

  applyNodeChanges(filter, value) {
    this.selectedNode.style[filter.updateCss] = value;
  }

  onBoldClick(filter) {
    filter.isSelected = !filter.isSelected;
    this.applyNodeChanges(filter, filter.isSelected ? 'bold' : 'normal');
  }

  onItalicClick(filter) {
    filter.isSelected = !filter.isSelected;
    this.applyNodeChanges(filter, filter.isSelected ? 'italic' : 'normal');
  }
}
