import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, ElementRef, ViewEncapsulation } from '@angular/core';
import { AVA_TOOLBAR_OPTIONS, FilterConfig, ELEMENT_TYPE_VS_TOOLBAR_OPT } from './toolbar.config';
import { FILTER_TYPES, ELEMENT_TYPES } from '../../../constants/contants';
import { UndoRedoUtil } from 'src/app/utils/undo-redo.util';
import { CanvasElement } from 'src/app/models/canvas.element.model';
import { CSS_PROPERTIES, CSS_PROPERTY_VALUES } from 'src/app/constants/css-constants';
import { CanvasUtils } from 'src/app/utils/canvas.utils';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent implements OnInit, OnChanges {

  @Input() options = [];
  @Input() selectedNodes = [];
  @Input() selectedCanvasElements: CanvasElement[] = [];

  @Output() removeSelectedItem = new EventEmitter();
  @Output() duplicateSelectedItem = new EventEmitter();
  @Output() groupSelectedItem = new EventEmitter();

  filterConfig = [];
  FILTER_TYPES = FILTER_TYPES;
  AVA_TOOLBAR_OPTIONS = AVA_TOOLBAR_OPTIONS;
  avaToolbarOptions = {};
  CSS_PROPS = CSS_PROPERTIES;
  CSS_PROP_VALUES = CSS_PROPERTY_VALUES;

  initialOpacity = 0;
  styles = {};
  isLocked: boolean;
  isGroupUngroupVisible = false;
  isGroupedItems: boolean;

  isAlignmentSelectorOpen: boolean;
  isOpacitySelectorOpen: boolean;

  fistCanvasElement: CanvasElement;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedCanvasElements) {
      if (this.selectedCanvasElements && this.selectedCanvasElements.length) {
        this.init();
      } else {
        this.updateToolbarConfig();
        this.isGroupUngroupVisible = false;
      }
    }
  }

  ngOnInit(): void {
  }

  init() {
    if (this.selectedCanvasElements.length > 1) {
      this.isGroupUngroupVisible = true;
      this.updateToolbarConfig(ELEMENT_TYPES.MULTIPLE_SELECTION);
    } else {
      this.fistCanvasElement = this.selectedCanvasElements[0];
      this.styles = this.getOriginalItemStyle();
      this.updateLock();
      this.updateToolbarConfig();
      this.updateGroupItemFlag();
    }
  }

  updateLock() {
    this.isLocked = this.fistCanvasElement.locked;
  }

  updateGroupItemFlag() {
    this.isGroupedItems = this.fistCanvasElement.type === ELEMENT_TYPES.GROUP;
    this.isGroupUngroupVisible = this.isGroupedItems;
  }

  getOriginalItemStyle() {
    return this.fistCanvasElement.style;
  }

  /**
   * Will update toolbar options if all the selected elements have same options
   */
  updateToolbarConfig(additionalType?: ELEMENT_TYPES) {
    const types = this.selectedCanvasElements ? this.selectedCanvasElements.map(t => t.type) : [];
    // tslint:disable-next-line: no-unused-expression
    additionalType && types.push(additionalType);
    let options = ELEMENT_TYPE_VS_TOOLBAR_OPT[types[0]] || [];
    for (let i = 1; i < types.length; i++) {
      const newOpt = ELEMENT_TYPE_VS_TOOLBAR_OPT[types[i]] || [];
      options = newOpt.filter(t => options.includes(t));
    }

    const opt = {};
    options.forEach(o => {
      opt[o] = true;
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
    this.selectedNodes[0].style[conf.cssField] = value;
  }

  onBoldClick() {
    const val = this.styles[CSS_PROPERTIES.FONT_WEIGHT] === CSS_PROPERTY_VALUES.FONT_WEIGHT_BOLD ?
      CSS_PROPERTY_VALUES.FONT_WEIGHT_NORMAL : CSS_PROPERTY_VALUES.FONT_WEIGHT_BOLD;
    this.updateCss({ [CSS_PROPERTIES.FONT_WEIGHT]: val });
  }

  updateCss(styles, permanent = true) {
    this.selectedNodes.forEach((node, index) => {
      CanvasUtils.applyCss(node, this.selectedCanvasElements[index], styles, permanent);
    });
  }

  onItalicClick() {
    const val = this.styles[CSS_PROPERTIES.FONT_ITALIC] === CSS_PROPERTY_VALUES.FONT_ITALIC ?
      CSS_PROPERTY_VALUES.FONT_STYLE_NORMAL : CSS_PROPERTY_VALUES.FONT_ITALIC;
    this.updateCss({ [CSS_PROPERTIES.FONT_ITALIC]: val });
  }

  removeItem() {
    this.removeSelectedItem.emit(this.getSelectedItems());
  }

  groupItem() {
    this.groupSelectedItem.emit(this.getSelectedItems());
  }

  lockItem() {
    this.fistCanvasElement.locked = !this.fistCanvasElement.locked;
    this.updateLock();
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
    UndoRedoUtil.addStyle(this.fistCanvasElement, this.selectedNodes, conf.cssField, cssValue);
  }

  updateOpacity(cssValue, permanent) {
    this.updateCss({ [CSS_PROPERTIES.OPACITY]: cssValue }, permanent);
  }

  undoItem() {
    UndoRedoUtil.undo(this.selectedCanvasElements, this.selectedNodes);
  }

  redoItem() {
    UndoRedoUtil.redo(this.selectedCanvasElements, this.selectedNodes);
  }

  duplicate() {
    this.duplicateSelectedItem.emit(this.getSelectedItems());
    // UndoRedoUtil.redo(this.selectedCanvasElements, this.selectedNodes);
  }

  getSelectedItems() {
    return {
      nodes: this.selectedNodes,
      canvasElements: this.selectedCanvasElements
    };
  }
}
