import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { CONST_VAR, ELEMENT_TYPES } from 'src/app/constants/contants';
import { CSS_PROPERTIES } from 'src/app/constants/css-constants';
import { Hasher } from 'src/app/constants/hasher';
import { AVA_TOOLBAR_OPTIONS, ELEMENT_TYPE_VS_TOOLBAR_OPT } from '../toolbar/toolbar.config';
import { EventerService, EventModal, EventTypes } from '../../shared/services/eventer.service';
import { map, filter } from 'rxjs/operators';
import { CanvasElement } from 'src/app/models/canvas.element.model';
import { ImageUtils } from 'src/app/utils/image.utils';
import { CanvasUtils } from 'src/app/utils/canvas.utils';
import { CommonUtils } from 'src/app/utils/common.utils';

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

  canvasOffsetLeft: number;
  canvasOffsetTop: number;

  selectedCanvasElement: CanvasElement;

  // Actual dom element of the selected item
  selectedNode: any;
  allNodes = [];

  projectNode: any;
  toolbarOptions = [];

  project = {
    elementId: 'my-first-element',
    id: 'jfaslj12o4u12oi',
    currentZindex: 1,
    canvasElement: {
      type: ELEMENT_TYPES.BACKGROUND,
      tag: 'div',
      dimention: {
        width: 500,
        height: 500
      },
      style: {
        width: '500px',
        height: '500px',
        position: 'relative',
        'background-color': 'white',
        '-webkit-print-color-adjust': 'exact',
        overflow: 'hidden'
      },
      attribute: {
        class: 'canvas-template'
      },
      children: []
    }
  };

  isDragging = false;
  isResizing = false;
  isRoating = false;
  showPreview = false;

  constructor(private eventer: EventerService) {
  }

  ngOnInit(): void {
    this.createInitialView();
    this.subscribeToEvent();
    this.subscribeEventer();
  }

  ngAfterViewInit(): void {
  }

  subscribeToEvent() {
    document.addEventListener('mouseup', (e) => {

      if (this.selectedNode) {
        this.isResizing = false;
        this.isDragging = false;
        this.isRoating = false;
      }
    });
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
    const nodeLocation = CanvasUtils.setInitialNodeLocation(e, data, canvasBound);

    this.addNewNode(data.item.canvasElement);
  }

  onDuplicateSelectedItem() {
    const newElement = CommonUtils.cloneDeep(this.selectedCanvasElement);
    const nodeLocation = CanvasUtils.setDuplicateNodeLocation(newElement);
    this.addNewNode(newElement);
  }

  addNewNode(canvasElement: CanvasElement) {

    this.adjustWidthHeight(canvasElement);

    const newNode = CanvasUtils.buildDom(canvasElement);

    this.attachEventListner(newNode, canvasElement);

    this.projectNode.appendChild(newNode);
    console.log(this.projectNode);

    // This has to be last statement
    this.addItemInProject(canvasElement);
  }

  onDragStart(e) {
    console.log(e);
  }

  onSelectStart(e) {
    console.log(e);
  }

  onSelect(e) {
    console.log(e);
  }
  onSelectEnd(e) {
    console.log(e);
  }

  adjustWidthHeight(canvasElement: CanvasElement) {
    if (canvasElement.type === ELEMENT_TYPES.PHOTO) {
      ImageUtils.setInitialWidthAndHeight(this.getProjectWidthHeight(), canvasElement);
    }
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
    const node = this.buildDom(this.project.canvasElement);
    // We need to iterate throug all the element and attach mouse down listener to all
    // this.attachEventListner(node, this.project, false);
    this.projectNode = node;
    this.canvas.nativeElement.appendChild(node);
  }

  buildDom(node) {
    const ele = document.createElement(node.tag);
    this.addElementStyle(ele, node.style);
    this.addInnerText(ele, node.innerText);
    this.addAttributes(ele, node.attribute);

    if (node.children) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < node.children.length; i++) {
        ele.appendChild(this.buildDom(node.children[i]));
      }
    }

    return ele;
  }

  addAttributes(ele, attrs) {
    if (attrs) {
      Object.keys(attrs).forEach(key => {
        ele.setAttribute(key, attrs[key]);
      });
    }
  }

  addElementStyle(ele, style) {
    if (style) {
      Object.keys(style).forEach(key => {
        ele.style[key] = style[key];
      });
    }
  }

  addInnerText(ele, innerText) {
    if (innerText) {
      ele.innerText = innerText;
    }
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
    this.doubleClickListener(node, canvasElement);
  }

  doubleClickListener(node, canvasElement) {
    if (this.selectedCanvasElement.type === ELEMENT_TYPES.TEXT) {
      const label = node.getElementsByTagName('label')[0];

      node.addEventListener('dblclick', () => {
        if (this.isElementLocked()) {
          return;
        }

        label.setAttribute(CSS_PROPERTIES.CONTENT_EDITABLE, true);
        label.focus();
      });

      label.addEventListener('blur', () => {
        if (this.isElementLocked()) {
          return;
        }
        label.setAttribute(CSS_PROPERTIES.CONTENT_EDITABLE, false);
        this.updateInnerText(node.innerText, canvasElement);
      });
    }
  }

  updateInnerText(innerText, canvasElement) {
    canvasElement.innerText = innerText;
  }

  selectElement(node, canvasElement, enableRotate) {

    // When user add a new item, we are slecting it by default
    this._selectElement(node, canvasElement, enableRotate);

    node.addEventListener('mousedown', (e) => {
      this._selectElement(node, canvasElement, enableRotate);
      // this.moveElementWithMouse(e);
    });
  }

  _selectElement(node, canvasElement, enableRotate) {
    // Store the selected element ref and show toobar
    this.showToolBar(node, canvasElement);
    this.addZIndex();
  }

  getInitialRotateDeg() {
    const val = this.selectedNode.style.transform;
    return val ? parseInt(val.split('rotate(')[1], 10) : 0;
  }

  addZIndex() {
    if (this.selectedNode && !this.isElementLocked() && this.selectedCanvasElement.increaseZIndex) {
      this.selectedNode.style[CSS_PROPERTIES.Z_INDEX] = this.project.currentZindex++;
    }
  }

  showToolBar(node, canvasElement) {
    this.toolbarOptions = ELEMENT_TYPE_VS_TOOLBAR_OPT[canvasElement.type];
    this.selectedNode = node;
    this.selectedCanvasElement = canvasElement;
  }

  onItemRemove() {
    const itemIndex = this.project.canvasElement.children.findIndex(t => t === this.selectedCanvasElement);
    if (itemIndex > -1) {
      this.project.canvasElement.children.splice(itemIndex, 1);
      this.selectedNode.remove();
      this.toolbarOptions = [];
    }
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

  isElementLocked() {
    return this.selectedCanvasElement ? this.selectedCanvasElement.locked : false;
  }
}
