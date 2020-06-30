import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, ElementRef } from '@angular/core';
import { AVA_TOOLBAR_OPTIONS, FilterConfig } from './toolbar.config';
import { FILTER_TYPES } from '../../../constants/contants';
import { CommonUtils } from '../../../utils/common.utils';
import { filter } from 'rxjs/operators';
import { CanvasUtils } from 'src/app/utils/canvas.utils';
import { UndoRedoUtil } from 'src/app/utils/undo-redo.util';


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
  @Output() removeSelectedItem = new EventEmitter();
  @Output() duplicateSelectedItem = new EventEmitter();

  filterConfig = [];
  FILTER_TYPES = FILTER_TYPES;
  AVA_TOOLBAR_OPTIONS = AVA_TOOLBAR_OPTIONS;
  initialOpacity = 0;
  styles = {};

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.options && this.options) {
      this.filterConfig = this.getFilterConfig();
    }

    if (changes.selectedItem && this.selectedItem) {
      this.styles = this.getOriginalItemStyle();
      this.setInitialState(this.styles);
    }
  }

  ngOnInit(): void {
  }

  getOriginalItemStyle() {
    return this.selectedItem.canvasElement.style;
  }

  getFilterConfig() {
    return CommonUtils.cloneDeep(FilterConfig.filter(conf => this.options.includes(conf.id)));
  }

  setInitialState(style) {
    if (style) {
      this.filterConfig.forEach(filter => {
        if (filter.filterType === FILTER_TYPES.TOGGABLE) {
          filter.isSelected = style[filter.cssField] === filter.cssValue;
        } else {
          this.changeSelectedValue(filter, style[filter.cssField]);
        }
      });
    }
  }

  onFontFamilySelect(filter, e, updateSelectedItem) {
    this.changeSelectedValue(filter, e.value);
    this.applyNodeChanges(filter, e.value);

    if (updateSelectedItem) {
      this.onCssChange(filter, e.value);
    }
  }

  onFontSizeSelect(filter, value, updateSelectedItem) {
    this.changeSelectedValue(filter, value);
    this.applyNodeChanges(filter, value);

    if (updateSelectedItem) {
      this.onCssChange(filter, value);
    }
  }

  onCloseWithoutSelect(filter) {
    const style = this.getOriginalItemStyle();
    this.applyNodeChanges(filter, style[filter.cssField]);
    this.changeSelectedValue(filter, style[filter.cssField]);
  }

  changeSelectedValue(filter, value) {
    filter.selectedValue = filter.id === AVA_TOOLBAR_OPTIONS.FONT_SIZE ? parseInt(value, 10) : value;
  }

  setFontSize(filter, value) {
    if (value) {
      this.onFontSizeSelect(filter, { value: value + 'px' }, true);
    }
  }

  applySelectedItemChanes(filter, value) {
    const style = this.getOriginalItemStyle();
    style[filter.cssField] = value;
  }

  applyNodeChanges(filter, value) {
    this.selectedNode.style[filter.cssField] = value;
  }

  onBoldClick(filter) {
    filter.isSelected = !filter.isSelected;
    this.onCssChange(filter, filter.isSelected ? 'bold' : 'normal');
  }

  onItalicClick(filter) {
    filter.isSelected = !filter.isSelected;
    this.onCssChange(filter, filter.isSelected ? 'italic' : 'normal');
  }

  removeItem() {
    this.removeSelectedItem.emit();
  }

  lockItem() {
    this.selectedItem.locked = !this.selectedItem.locked;

    // This will trigger changes to selected element, such as removing the Resize Handle
    this.selectedNode.dispatchEvent(new Event('mousedown'));

    setTimeout(() => {
      this.selectedNode.dispatchEvent(new Event('mouseup'));
    }, 50);
  }

  onColorHover(filter, color) {
    this.applyNodeChanges(filter, color);
  }

  onColorSelect(filter, color) {
    this.onCssChange(filter, color);
  }

  onCssChange(filter, cssValue) {
    UndoRedoUtil.addStyle(this.selectedItem, this.selectedNode, filter.cssField, cssValue);
  }

  updateOpacity(filter, cssValue) {
    this.applyNodeChanges(filter, cssValue);
  }

  updateOpacityOnStop(filter, cssValue) {
    this.onCssChange(filter, cssValue);
  }

  undoItem() {
    UndoRedoUtil.undo(this.selectedItem, this.selectedNode);
  }

  redoItem() {
    UndoRedoUtil.redo(this.selectedItem, this.selectedNode);
  }

  duplicate() {
    this.duplicateSelectedItem.emit();
    // UndoRedoUtil.redo(this.selectedItem, this.selectedNode);
  }
}
