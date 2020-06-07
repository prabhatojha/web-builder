import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { CONST_VAR } from 'src/app/constants/contants';
import { CSS_PROPERTIES } from 'src/app/constants/css-constants';
import { Hasher } from 'src/app/constants/hasher';
import { AVA_TOOLBAR_OPTIONS } from '../toolbar/toolbar.config';
import { EventerService, EventModal, EventTypes } from '../../shared/services/eventer.service';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CanvasComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas', { static: true }) canvas: ElementRef;
  @ViewChild('canvasContainer', { static: true }) canvasContainer: ElementRef;
  CANVAS_EVENTS = [EventTypes.CANVAS_PREVIEW, EventTypes.CANVAS_DOWNLOAD];

  canvasOffsetLeft: number;
  canvasOffsetTop: number;

  // Is the object reprentation of the selected item
  selectedItem: any;

  // Actual dom element of the selected item
  selectedNode: any;

  projectNode: any;
  toolbarOptions = [];


  // Selected dom element's variables
  initialWidth = 0;
  initialHeight = 0;
  initialClientX = 0;
  initialClientY = 0;
  initialLeft = 0;
  initialTop = 0;

  project = {
    elementId: 'my-first-element',
    id: 'jfaslj12o4u12oi',
    toolbarOptions: [2],
    searchKeywords: [],
    currentZindex: 1,
    canvaElement: {
      tag: 'div',
      style: {
        width: '500px',
        height: '500px',
        position: 'relative',
        'background-color': 'rgb(180, 72, 0, 0.4)',
        '-webkit-print-color-adjust': 'exact'

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
        this.canvasContainer.nativeElement.removeEventListener('mousemove', this.mouseMoveListner);

        this.isResizing = false;
        this.isDragging = false;
        this.isRoating = false;

        const style = this.selectedItem.canvaElement.style;
        const targetStyle = this.selectedNode.style;
        style.width = targetStyle.width;
        style.height = targetStyle.height;
        style.left = targetStyle.left;
        style.top = targetStyle.top;

        console.log(this.project);
      }
    });
  }

  mouseMoveListner = (e) => {
    if (this.isDragging) {
      this.onItemDrag(e);
    } else if (this.isResizing) {
      this.onItemResize(e);
    } else if (this.isRoating) {
      this.onItemResize(e);
    }
  }

  onItemDrag(e) {
    this.selectedNode.style.left = this.initialLeft + (e.clientX - this.initialClientX) + 'px';
    this.selectedNode.style.top = this.initialTop + (e.clientY - this.initialClientY) + 'px';
  }

  onItemResize(e) {
    this.selectedNode.style.width = this.initialWidth + e.clientX - this.initialClientX + 'px';
    this.selectedNode.style.height = this.initialHeight + e.clientY - this.initialClientY + 'px';
  }

  onItemRotate(e) {

  }

  drop(e) {
    e.preventDefault();
    this.addNewNode(e, e.dataTransfer.getData(CONST_VAR.PICKER_ITEM));
  }

  addNewNode(e, unparseData) {

    if (!unparseData) {
      return;
    }

    const data = JSON.parse(unparseData);
    const canvasElement = data.item.canvaElement;
    const newNode = this.buildDom(canvasElement);

    this.setNodeLocation(e, newNode, data, canvasElement);
    this.attachEventListner(newNode, data.item);

    this.projectNode.appendChild(newNode);

    this.addItemInProject(canvasElement);
  }

  addItemInProject(item) {
    this.project.canvaElement.children.push(item);
  }

  setNodeLocation(e, newNode: any, data, canvasElement) {
    const canvasBound = this.projectNode.getBoundingClientRect();
    const posX = e.clientX - canvasBound.left - data.left + 'px';
    const posY = e.clientY - canvasBound.top - data.top + 'px';
    newNode.style.left = posX;
    newNode.style.top = posY;
    canvasElement.style.left = posX;
    canvasElement.style.top = posY;
  }

  allowDrop(e) {
    e.preventDefault();
  }

  createInitialView() {
    const node = this.buildDom(this.project.canvaElement);
    this.attachEventListner(node, this.project);
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
    // const isEmptyClick = e.target.className.includes('canvas-template');
    // if (isEmptyClick) {
    //   this.toolbarOptions = [];
    //   this.removeResizeHandleAndBorder();
    //   this.selectedNode = null;
    //   this.selectedItem = null;
    // }
  }

  attachEventListner(node, item) {
    this.selectElement(node, item);
    this.doubleClickListener(node, item);
  }

  doubleClickListener(node, item) {
    if (this.selectedItem.canvaElement.type === 'text') {
      node.addEventListener('dblclick', (e) => {
        if (this.isElementLocked()) {
          return;
        }
        node.setAttribute(CSS_PROPERTIES.CONTENT_EDITABLE, true);
        node.focus();
      });

      node.addEventListener('blur', (e) => {
        if (this.isElementLocked()) {
          return;
        }
        node.setAttribute(CSS_PROPERTIES.CONTENT_EDITABLE, false);
        this.updateInnerText(node.innerText, item);
      });
    }
  }

  updateInnerText(innerText, item) {
    const span = item.canvaElement.children[0];
    span.innerText = innerText;
  }

  selectElement(node, item) {

    // When user add a new item, we are slecting it by default
    this._selectElement(node, item);

    node.addEventListener('mousedown', (e) => {
      e.stopPropagation();
      this._selectElement(node, item);
      this.moveElementWithMouse(e);
    });
  }

  moveElementWithMouse(ce) {
    if (this.isElementLocked()) {
      return;
    }
    this.isDragging = true;
    this.initialLeft = parseInt(this.selectedNode.style.left, 10);
    this.initialTop = parseInt(this.selectedNode.style.top, 10);
    this.initialClientX = ce.clientX;
    this.initialClientY = ce.clientY;
    this.canvasContainer.nativeElement.addEventListener('mousemove', this.mouseMoveListner);
  }

  _selectElement(node, item) {
    // Remove handler from previous selected item
    this.removeResizeHandleAndBorder();

    // Store the selected element ref and show toobar
    this.showToolBar(node, item);

    // Add handler to current selected item
    this.addSelectedNodeBoarder();
    this.addZIndex();
    this.attachResizeHandler(node);
    this.attachRotateHandler(node);
  }

  attachResizeHandler(node) {
    if (this.isElementLocked()) {
      return;
    }

    const resizeHandler = document.createElement('div');
    resizeHandler.classList.add(CONST_VAR.RESIZE_HANDLER_CLASS);

    resizeHandler.addEventListener('mousedown', (e) => {
      console.log('Resize');
      this.isResizing = true;
      e.stopPropagation();
      this.initialWidth = this.selectedNode.offsetWidth;
      this.initialHeight = this.selectedNode.offsetHeight;
      this.initialClientX = e.clientX;
      this.initialClientY = e.clientY;
      this.canvasContainer.nativeElement.addEventListener('mousemove', this.mouseMoveListner);
    });

    node.appendChild(resizeHandler);
  }

  attachRotateHandler(node) {
    if (this.isElementLocked()) {
      return;
    }

    const resizeHandler = document.createElement('i');
    resizeHandler.innerText = 'rotate_left';
    resizeHandler.classList.add(CONST_VAR.ROTATE_HANDLER_ICON);
    resizeHandler.classList.add(CONST_VAR.ROTATE_HANDLER_CLASS);

    resizeHandler.addEventListener('mousedown', (e) => {
      console.log('Rotate');
      this.isRoating = true;
      e.stopPropagation();
      this.initialWidth = this.selectedNode.offsetWidth;
      this.initialHeight = this.selectedNode.offsetHeight;
      this.initialClientX = e.clientX;
      this.initialClientY = e.clientY;
      this.canvasContainer.nativeElement.addEventListener('mousemove', this.mouseMoveListner);
    });

    node.appendChild(resizeHandler);
  }

  addSelectedNodeBoarder() {
    if (this.selectedNode) {
      this.selectedNode.style.outline = '1px solid gray';
    }
  }

  addZIndex() {
    if (this.selectedNode && !this.isElementLocked()) {
      this.selectedNode.style[CSS_PROPERTIES.Z_INDEX] = this.project.currentZindex++;
    }
  }

  removeResizeHandleAndBorder() {
    if (this.selectedNode) {
      this.selectedNode.style.removeProperty('outline');
      const resizeHandlers = this.selectedNode.getElementsByClassName(CONST_VAR.RESIZE_HANDLER_CLASS);
      if (resizeHandlers && resizeHandlers[0]) {
        resizeHandlers[0].remove();
      }
    }
  }

  showToolBar(node, item) {
    this.toolbarOptions = item.toolbarOptions;
    this.selectedNode = node;
    this.selectedItem = item;
  }

  onItemRemove() {
    const itemIndex = this.project.canvaElement.children.findIndex(t => t === this.selectedItem.canvaElement);
    if (itemIndex > -1) {
      this.project.canvaElement.children.splice(itemIndex, 1);
      this.selectedNode.remove();
      this.toolbarOptions = [];
    }
  }

  // Preview Canvas

  subscribeEventer() {
    this.eventer.get().pipe(filter((t: EventModal) => this.CANVAS_EVENTS.includes(t.type))).subscribe((event: EventModal) => {

      if (event.type === EventTypes.CANVAS_PREVIEW) {
        this.showPreview = true;
      }
    });
  }

  isElementLocked() {
    return this.selectedItem ? this.selectedItem.locked : false;
  }
}
