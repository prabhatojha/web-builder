import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, ElementRef } from '@angular/core';
import { AVA_TOOLBAR_OPTIONS, FilterConfig } from './toolbar.config';
import { FILTER_TYPES } from '../../../constants/contants';
import { CommonUtils } from '../../../utils/common.utils';
import { UndoRedoUtil } from 'src/app/utils/undo-redo.util';
import { CanvasElement } from 'src/app/models/canvas.element.model';
import { CSS_PROPERTIES, CSS_PROPERTY_VALUES } from 'src/app/constants/css-constants';
import { CanvasUtils } from 'src/app/utils/canvas.utils';
import { debug } from 'console';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnChanges {

  @Input() options = [];
  @Input() selectedNode: any;
  @Input() selectedCanvasElement: CanvasElement;

  @Output() hoverItem = new EventEmitter();
  @Output() removeSelectedItem = new EventEmitter();
  @Output() duplicateSelectedItem = new EventEmitter();

  filterConfig = [];
  FILTER_TYPES = FILTER_TYPES;
  AVA_TOOLBAR_OPTIONS = AVA_TOOLBAR_OPTIONS;
  avaToolbarOptions = {};
  CSS_PROPS = CSS_PROPERTIES;

  initialOpacity = 0;
  styles = {};
  isLocked: boolean;
  isGroupUngroupVisible = true;
  isGroupedItems: boolean;

  isAlignmentSelectorOpen: boolean;
  isOpacitySelectorOpen: boolean;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedCanvasElement && this.selectedCanvasElement) {
      this.styles = this.getOriginalItemStyle();
      this.updateLock();
      this.setFilterConfig();
    }

    if (changes.selectedCanvasElement && !this.selectedCanvasElement) {
      this.avaToolbarOptions = {};
    }
  }

  ngOnInit(): void {
  }

  updateLock() {
    this.isLocked = this.selectedCanvasElement.locked;
  }

  getOriginalItemStyle() {
    return this.selectedCanvasElement.style;
  }

  setFilterConfig() {
    const opt = {};
    this.options.forEach(t => {
      opt[t] = true;
    });

    this.avaToolbarOptions = opt;
  }

  onFontFamilySelect(e) {
    this.updateCss({ [CSS_PROPERTIES.FONT_FAMILY]: e.value });
  }

  onFontSizeSelect(value) {
    this.updateCss({ [CSS_PROPERTIES.FONT_SIZE]: value });
  }

  onCloseWithoutSelect(conf) {
    const style = this.getOriginalItemStyle();
    this.applyNodeChanges(conf, style[conf.cssField]);
    this.changeSelectedValue(conf, style[conf.cssField]);
  }

  changeSelectedValue(conf, value) {
    conf.selectedValue = conf.id === AVA_TOOLBAR_OPTIONS.FONT_SIZE ? parseInt(value, 10) : value;
  }

  applySelectedItemChanes(conf, value) {
    const style = this.getOriginalItemStyle();
    style[conf.cssField] = value;
  }

  applyNodeChanges(conf, value) {
    this.selectedNode.style[conf.cssField] = value;
  }

  onBoldClick() {
    const val = this.styles[CSS_PROPERTIES.FONT_WEIGHT] === CSS_PROPERTY_VALUES.FONT_WEIGHT_BOLD ?
      CSS_PROPERTY_VALUES.FONT_WEIGHT_NORMAL : CSS_PROPERTY_VALUES.FONT_WEIGHT_BOLD;
    this.updateCss({ [CSS_PROPERTIES.FONT_WEIGHT]: val });
  }

  updateCss(styles, permanent = true) {
    console.log(styles);
    CanvasUtils.applyCss(this.selectedNode, this.selectedCanvasElement, styles, permanent);
  }

  onItalicClick() {
    const val = this.styles[CSS_PROPERTIES.FONT_ITALIC] === CSS_PROPERTY_VALUES.FONT_ITALIC ?
      CSS_PROPERTY_VALUES.FONT_STYLE_NORMAL : CSS_PROPERTY_VALUES.FONT_ITALIC;
    this.updateCss({ [CSS_PROPERTIES.FONT_ITALIC]: val });
  }

  removeItem() {
    this.removeSelectedItem.emit();
  }

  lockItem() {
    this.selectedCanvasElement.locked = !this.selectedCanvasElement.locked;
    this.updateLock();
    // This will trigger changes to selected element, such as removing the Resize Handle
    // this.selectedNode.dispatchEvent(new Event('mousedown'));

    // setTimeout(() => {
    //   this.selectedNode.dispatchEvent(new Event('mouseup'));
    // }, 50);
  }

  onColorSelect(color) {
    this.updateCss({ [CSS_PROPERTIES.COLOR]: color });
  }

  onBGColorSelect(color) {
    this.updateCss({ [CSS_PROPERTIES.BG_COLOR]: color });
  }

  onTextAlign(value) {
    this.updateCss({ [CSS_PROPERTIES.TEXT_ALIGN]: value });
  }

  onCssChange(conf, cssValue) {
    UndoRedoUtil.addStyle(this.selectedCanvasElement, this.selectedNode, conf.cssField, cssValue);
  }

  updateOpacity(cssValue, permanent) {
    this.updateCss({ [CSS_PROPERTIES.OPACITY]: cssValue }, permanent);
  }

  undoItem() {
    UndoRedoUtil.undo(this.selectedCanvasElement, this.selectedNode);
  }

  redoItem() {
    UndoRedoUtil.redo(this.selectedCanvasElement, this.selectedNode);
  }

  duplicate() {
    this.duplicateSelectedItem.emit();
    // UndoRedoUtil.redo(this.selectedCanvasElement, this.selectedNode);
  }
}
