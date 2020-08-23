import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { CONST_VAR, ELEMENT_TYPES } from 'src/app/constants/contants';
import { CSS_PROPERTIES, ATTR_PROPERTIES, CSS_PROPERTY_VALUES, CSS_CLASSES } from 'src/app/constants/css-constants';
import { ELEMENT_TYPE_VS_TOOLBAR_OPT } from '../toolbar/toolbar.config';
import { EventerService, EventModal, EventTypes } from '../../shared/services/eventer.service';
import { filter } from 'rxjs/operators';
import { CanvasElement } from 'src/app/models/canvas.element.model';
import { ImageUtils } from 'src/app/utils/image.utils';
import { CanvasUtils } from 'src/app/utils/canvas.utils';
import { CommonUtils } from 'src/app/utils/common.utils';
import { NgxElementSelectorEvent } from 'projects/ngx-element-selector/src/public-api';
import { CANVAS_PROJECT } from './canvas.config';
import { CSSUtils } from 'src/app/utils/css.utils';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CanvasComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas', { static: true }) canvas: ElementRef;
  @ViewChild('canvasContainer', { static: true }) canvasContainer: ElementRef;
  CANVAS_EVENTS = [EventTypes.CANVAS_PREVIEW, EventTypes.CANVAS_DOWNLOAD, EventTypes.CANVAS_ADD_ITEM];

  body = document.body;

  selectedCanvasElement: CanvasElement;
  // Actual dom element of the selected item
  selectedNode: any;
  selectedNodes: Element[];
  selectedCanvasElements: CanvasElement[];

  // Project node is the first canvas element from CANVAS_PROJECT
  projectNode: HTMLElement;
  toolbarOptions = [];

  project = CANVAS_PROJECT;

  showPreview = false;

  defaultGroupRotate = 0;

  constructor(private eventer: EventerService) {
  }

  ngOnInit(): void {
    this.createInitialView();
    this.subscribeEventer();
  }

  ngAfterViewInit(): void {
  }

  drop(e) {
    e.preventDefault();
    const unparseData = e.dataTransfer.getData(CONST_VAR.PICKER_ITEM);
    if (!unparseData) {
      return;
    }

    const data = JSON.parse(unparseData);
    const canvasElement: CanvasElement = data.item.canvasElement;
    const canvasBound = this.projectNode.getBoundingClientRect();
    CanvasUtils.setInitialNodeLocation(e, data, canvasBound);

    this.addNewNode(canvasElement);
  }

  onDuplicateSelectedItem({ canvasElements }) {
    canvasElements.forEach(element => {
      const newElement = CommonUtils.cloneDeep(element);
      CanvasUtils.setDuplicateNodeLocation(newElement);
      this.addNewNode(newElement);
    });
  }

  addNewNode(canvasElement: CanvasElement) {
    switch (canvasElement.type) {
      case ELEMENT_TYPES.BACKGROUND:
        this.handleBackgroundChange(canvasElement);
        break;
      default:
        this.handleGenericElements(canvasElement);
    }
  }

  handleBackgroundChange(canvasElement: CanvasElement) {
    this.projectNode.style[CSS_PROPERTIES.BG] = canvasElement.style[CSS_PROPERTIES.BG];
    this.project.canvasElement.style[CSS_PROPERTIES.BG] = canvasElement.style[CSS_PROPERTIES.BG];
  }

  handleGenericElements(canvasElement: CanvasElement) {
    this.adjustWidthHeight(canvasElement);
    const newNode = CanvasUtils.buildDom(canvasElement);
    this.attachEventListner(newNode, canvasElement);
    this.projectNode.appendChild(newNode);
    this.addItemInProject(canvasElement);
  }

  adjustWidthHeight(canvasElement: CanvasElement) {
    if (canvasElement.type === ELEMENT_TYPES.PHOTO) {
      ImageUtils.setInitialWidthAndHeight(this.getProjectWidthHeight(), canvasElement);
    }
  }

  onSelectionStart(e: NgxElementSelectorEvent) {
  }

  onSelection(e) {
    e.removed.forEach(t => t.style.outline = '');
    e.selected.forEach(t => t.style.outline = '1px dashed darkgray');
  }

  selectoDragStart(e) {
    const classList: DOMTokenList = e.inputEvent.target.classList;
    if (classList.contains(CSS_CLASSES.MOVEABLE_AREA) || classList.contains(CSS_CLASSES.MOVEABLE_CONTROL) ||
      classList.contains(CSS_CLASSES.MOVEABLE_LINE)) {
      e.stop();
    }
  }

  selectoDragEnd(e) {
  }

  onSelectionEnd({ selected }) {
    selected.forEach(t => t.style.outline = '');
    const children = this.projectNode.children;
    const ce = [];

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < children.length; i++) {
      if (selected.includes(children[i])) {
        ce.push(this.project.canvasElement.children[i]);
      }
    }

    this.setInitialGroupRotate(ce[0]);
    this.selectedNodes = selected;
    this.selectedCanvasElements = ce;
  }

  setInitialGroupRotate(canvasElement: CanvasElement) {
    this.defaultGroupRotate = canvasElement ?
      CSSUtils.getTransformValue(canvasElement.style[CSS_PROPERTIES.TRANSFORM], 'rotate') : 0;
  }

  onSelectEnd(e) {
  }

  getProjectWidthHeight() {
    return {
      width: this.project.canvasElement.dimention.width,
      height: this.project.canvasElement.dimention.height
    };
  }

  addItemInProject(item) {
    this.project.canvasElement.children.push(item);
  }

  setNodeLocation(location, newNode: any, canvasElement: CanvasElement) {
    canvasElement.dimention.translateX = location.x;
    canvasElement.dimention.translateY = location.y;

    CanvasUtils.applyDimention(newNode, canvasElement, canvasElement.dimention, true);
  }

  allowDrop(e) {
    e.preventDefault();
  }

  createInitialView() {
    const node = CanvasUtils.buildDom(this.project.canvasElement);
    // We need to iterate throug all the element and attach mouse down listener to all
    // this.attachEventListner(node, this.project, false);
    this.projectNode = node;
    this.canvas.nativeElement.appendChild(node);
  }

  onCanvasClick(e) {
    // Temporary
    if (e.target && e.target.classList.contains('canvas-template')) {
      this.selectedNode = null;
      this.selectedCanvasElement = null;
    }
  }

  attachEventListner(node, canvasElement, enableRotate = true) {
    this.selectElement(node, canvasElement, enableRotate);
  }

  selectElement(node, canvasElement, enableRotate) {
    this.selectedNodes = [node];
    this.selectedCanvasElements = [canvasElement];

    // When user add a new item, we are slecting it by default
    this._selectElement(node, canvasElement, enableRotate);

    node.addEventListener('mousedown', (e) => {
      this._selectElement(node, canvasElement, enableRotate);
    });
  }

  _selectElement(node, canvasElement, enableRotate) {
    // Store the selected element ref and show toobar
    this.addZIndex(node, canvasElement);
  }

  getInitialRotateDeg() {
    const val = this.selectedNode.style.transform;
    return val ? parseInt(val.split('rotate(')[1], 10) : 0;
  }

  addZIndex(node, canvasElement) {
    CanvasUtils.applyCss(node, canvasElement, {
      [CSS_PROPERTIES.Z_INDEX]: this.project.currentZindex++
    }, true);
  }

  onItemRemove({ canvasElements, nodes }, selectNextElement = true) {
    const children = this.project.canvasElement.children.filter(t => !canvasElements.includes(t));
    this.project.canvasElement.children = children;

    nodes.forEach(node => {
      node.remove();
    });

    if (selectNextElement) {
      const childNodes = this.projectNode.children;
      this.selectedCanvasElements = children.length ? [children[children.length - 1]] : [];
      this.selectedNodes = childNodes.length ? [childNodes[childNodes.length - 1]] : [];
    }
  }

  onItemGroup(e) {
    const newCanvasElement = new CanvasElement('div', {}, { position: 'absolute' }, e.canvasElements);
    newCanvasElement.type = ELEMENT_TYPES.GROUP;

    CanvasUtils.setGroupNodeLocation(e.nodes, newCanvasElement, this.canvas.nativeElement);

    this.onItemRemove(e, false);
    this.addNewNode(newCanvasElement);
  }

  onItemUnGroup(e) {
    const parent: CanvasElement = e.canvasElements[0];
    const parentPos = CSSUtils.getTransformValue(parent.style.transform, 'translate');
    parent.children.forEach((child: CanvasElement) => {
      const childPos = CSSUtils.getTransformValue(child.style.transform, 'translate');
      CSSUtils.updateTransformValue(child.style, 'translate', `translate(${parentPos.x + childPos.x}px,${parentPos.y + childPos.y}px)`);
      this.addNewNode(child);
    });
    CanvasUtils.setUnGroupNodeLocation(e.nodes[0], e.canvasElements[0]);

    this.onItemRemove(e, false);
  }

  subscribeEventer() {
    this.eventer.get().pipe(filter((t: EventModal) => this.CANVAS_EVENTS.includes(t.type))).subscribe((event: EventModal) => {
      this.processEventer(event);
    });
  }

  processEventer(event: EventModal) {
    switch (event.type) {
      case EventTypes.CANVAS_PREVIEW:
        this.showPreview = true;
        break;
      case EventTypes.CANVAS_ADD_ITEM:
        this.addNewNode(event.value.item);
        break;
    }
  }
}
