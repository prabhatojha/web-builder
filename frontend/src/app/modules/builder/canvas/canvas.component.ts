import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { CONST_VAR, ELEMENT_TYPES } from 'src/app/constants/contants';
import { CSS_PROPERTIES, ATTR_PROPERTIES } from 'src/app/constants/css-constants';
import { ELEMENT_TYPE_VS_TOOLBAR_OPT } from '../toolbar/toolbar.config';
import { EventerService, EventModal, EventTypes } from '../../shared/services/eventer.service';
import { filter } from 'rxjs/operators';
import { CanvasElement } from 'src/app/models/canvas.element.model';
import { ImageUtils } from 'src/app/utils/image.utils';
import { CanvasUtils } from 'src/app/utils/canvas.utils';
import { CommonUtils } from 'src/app/utils/common.utils';
import { NgxElementSelectorEvent } from 'projects/ngx-element-selector/src/public-api';
import { CANVAS_PROJECT } from './canvas.config';

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
  selectedNodes: HTMLElement[];
  selectedCanvasElements: CanvasElement[];

  projectNode: HTMLElement;
  toolbarOptions = [];

  project = CANVAS_PROJECT;

  showPreview = false;

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

    this.addItemInProject(canvasElement);
  }

  adjustWidthHeight(canvasElement: CanvasElement) {
    if (canvasElement.type === ELEMENT_TYPES.PHOTO) {
      ImageUtils.setInitialWidthAndHeight(this.getProjectWidthHeight(), canvasElement);
    }
  }

  onSelectionStart(e: NgxElementSelectorEvent) {
    // console.log('Start', e);
    // e.targets.forEach(t => t.style.outline = '');
  }

  onSelection(e: NgxElementSelectorEvent) {
    // console.log('Doing', e);
    // e.removed.forEach(t => t.style.outline = '');
    // e.added.forEach(t => t.style.outline = '2px solid lightblue');
  }

  onSelectionEnd({ selected }) {
    const children = [...this.projectNode.children];
    const ce = [];

    for (let i = 0; i < children.length; i++) {
      if (selected.includes(children[i])) {
        ce.push(this.project.canvasElement.children[i]);
      }
    }
    this.selectedNodes = selected;
    this.selectedCanvasElements = ce;

    console.log(this.selectedNodes, this.selectedCanvasElements);
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
      // this.selectedNodes = [];
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

        label.setAttribute(ATTR_PROPERTIES.CONTENT_EDITABLE, true);
        label.focus();
      });

      label.addEventListener('blur', () => {
        if (this.isElementLocked()) {
          return;
        }
        label.setAttribute(ATTR_PROPERTIES.CONTENT_EDITABLE, false);
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
      // e.stopPropagation();
      this._selectElement(node, canvasElement, enableRotate);
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
