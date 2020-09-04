import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, ElementRef, ViewEncapsulation } from '@angular/core';
import { AVA_TOOLBAR_OPTIONS, ELEMENT_TYPE_VS_TOOLBAR_OPT } from './toolbar.config';
import { FILTER_TYPES, ELEMENT_TYPES } from '../../../constants/contants';
import { CanvasElement } from 'src/app/models/canvas.element.model';
import { CSS_PROPERTIES, CSS_PROPERTY_VALUES } from 'src/app/constants/css-constants';
import { CanvasUtils } from 'src/app/utils/canvas.utils';
import { EventerService, EventTypes } from '../../shared/services/eventer.service';
import { CSSUtils } from 'src/app/utils/css.utils';
import { UndoService, UndoRedoType } from '../../shared/services/undo-redo/undo.service';

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
  @Output() unGroupSelectedItem = new EventEmitter();
  @Output() clearSelectedElements = new EventEmitter();

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

  constructor(private eventerService: EventerService, public undoService: UndoService) { }

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
      this.updateToolbarConfig(ELEMENT_TYPES.MULTIPLE_SELECTION);
    } else {
      this.fistCanvasElement = this.selectedCanvasElements[0];
      this.styles = this.getOriginalItemStyle();
      this.updateToolbarConfig();
    }
    this.updateLock();
    this.updateGroupItemFlag();
  }

  updateLock() {
    this.isLocked = !this.selectedCanvasElements.some(t => !t.locked);
  }

  updateGroupItemFlag() {
    this.isGroupUngroupVisible = this.fistCanvasElement.type === ELEMENT_TYPES.GROUP || this.selectedCanvasElements.length > 1;
    this.isGroupedItems = this.fistCanvasElement.type === ELEMENT_TYPES.GROUP && this.selectedCanvasElements.length === 1;
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

  /**
   * Will update the CSS respective to each action on toolbar.
   * One entry point for all toolbar actions
   * Will register the change to the undo redo service
   *
   * @styles action as a style change
   * @permanent weather to update CanvasElement
   */
  updateCss(styles, permanent = true) {
    const oldStyles = CanvasUtils.getClonedStylesAsText(this.selectedCanvasElements);
    this.selectedNodes.forEach((node, index) => {
      if (!this.selectedCanvasElements[index].locked) {
        CanvasUtils.applyCss(node, this.selectedCanvasElements[index], styles, permanent);
      }
    });

    if (permanent) {
      this.undoService.add({
        canvasElements: this.selectedCanvasElements,
        nodes: this.selectedNodes,
        type: UndoRedoType.STYLE,
        oldStyle: oldStyles,
        newStyle: CanvasUtils.getClonedStylesAsText(this.selectedCanvasElements)
      });
    }
  }

  onFlip(x, y) {
    const style = this.fistCanvasElement.style;
    const val = style[CSS_PROPERTIES.TRANSFORM];
    this.updateCss({
      [CSS_PROPERTIES.TRANSFORM]: val && val !== CSS_PROPERTY_VALUES.NONE ? `${val} scale(${x}, ${y})` : `scale(${x}, ${y})`
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
    if (this.isGroupedItems) {
      this.unGroupSelectedItem.emit(this.getSelectedItems());
    } else {
      this.groupSelectedItem.emit(this.getSelectedItems());
    }
  }

  lockItem() {
    this.isLocked = !this.isLocked;
    this.selectedCanvasElements.forEach(t => {
      t.locked = this.isLocked;
    });
    this.eventerService.send({ type: EventTypes.UPDATE_DIRECTION_HANLDES });
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
    // UndoRedoUtil.addStyle(this.fistCanvasElement, this.selectedNodes, conf.cssField, cssValue);
  }

  updateOpacity(cssValue, permanent) {
    this.updateCss({ [CSS_PROPERTIES.OPACITY]: cssValue }, permanent);
  }

  undoItem() {
    this.clearSelectedElements.emit();
    this.undoService.undo();
  }

  redoItem() {
    this.clearSelectedElements.emit();
    this.undoService.redo();
  }

  duplicate() {
    this.duplicateSelectedItem.emit(this.getSelectedItems());
  }

  getSelectedItems() {
    return {
      nodes: this.selectedNodes,
      canvasElements: this.selectedCanvasElements
    };
  }
}
