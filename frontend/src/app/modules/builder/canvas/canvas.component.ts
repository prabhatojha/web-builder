import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { CONST_VAR } from 'src/app/constants/contants';
import { CSS_PROPERTIES } from 'src/app/constants/css-constants';
import { Hasher } from 'src/app/constants/hasher';
import { AVA_TOOLBAR_OPTIONS } from '../toolbar/toolbar.config';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CanvasComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas', { static: true }) canvas: ElementRef;

  canvasOffsetLeft: number;
  canvasOffsetTop: number;
  selectedItem: any;
  selectedNode: any;
  projectNode: any;
  toolbarOptions = [];

  project = {
    tag: 'div',
    style: {
      width: '400px',
      height: '500px',
      position: 'relative',
      background: 'white'
    },
    attribute: {
      class: 'canvas-template'
    },
    children: []
  };

  constructor() {

  }

  ngAfterViewInit(): void {
  }

  drag(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
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
    this.attachEventListner(newNode, data.item, canvasElement);

    this.projectNode.appendChild(newNode);

    this.addItemInProject(canvasElement);
  }

  addItemInProject(item) {
    this.project.children.push(item);
    console.log(this.project);
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

  ngOnInit(): void {
    this.createInitialView();
  }

  createInitialView() {
    const node = this.buildDom(this.project);
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
    const isEmptyClick = e.target.className.includes('canvas-template');
    if (isEmptyClick) {
      this.toolbarOptions = [];
      this.removeResizeHandleAndBorder();
      this.selectedNode = null;
      this.selectedItem = null;
    }
  }

  attachEventListner(node, item, canvasElement) {
    this.moveElementWithMouse(node, canvasElement);
    this.selectElement(node, item, canvasElement);
  }

  attachResizeHandler(node, canvasElement) {
    const resizeHandler = document.createElement('div');
    resizeHandler.classList.add(CONST_VAR.RESIZE_HANDLER_CLASS);
    resizeHandler.style.cssText = 'position: absolute;width: 15px;height: 15px;border-bottom: 5px solid gray;' +
      'border-right: 5px solid gray;right: -5px;bottom: -5px;cursor: nwse-resize';

    let initialWidth = 0;
    let initialHeight = 0;
    let initialX = 0;
    let initialY = 0;

    const mouseMoveListner = (e) => {
      this.selectedNode.style.width = initialWidth + e.clientX - initialX + 'px';
      this.selectedNode.style.height = initialHeight + e.clientY - initialY + 'px';
    };

    resizeHandler.addEventListener('mousedown', (e) => {
      e.stopPropagation();
      initialWidth = this.selectedNode.offsetWidth;
      initialHeight = this.selectedNode.offsetHeight;
      initialX = e.clientX;
      initialY = e.clientY;
      console.log(initialX, initialWidth);
      this.canvas.nativeElement.addEventListener('mousemove', mouseMoveListner);
    });

    document.addEventListener('mouseup', (e) => {
      e.stopPropagation();
      canvasElement.style.width = this.selectedNode.style.width;
      canvasElement.style.height = this.selectedNode.style.height;
      this.canvas.nativeElement.removeEventListener('mousemove', mouseMoveListner);
    });

    node.appendChild(resizeHandler);
  }

  selectElement(node, item, canvasElement) {
    this._selectElement(node, item, canvasElement);
    node.addEventListener('mousedown', () => {
      this._selectElement(node, item, canvasElement);
    });
  }

  _selectElement(node, item, canvasElement) {
    this.removeResizeHandleAndBorder();
    this.removeZIndex();
    this.showToolBar(node, item);
    this.addSelectedNodeBoarder();
    this.addZIndex();
    this.attachResizeHandler(node, canvasElement);
  }

  addSelectedNodeBoarder() {
    if (this.selectedNode) {
      this.selectedNode.style.outline = '1px solid gray';
    }
  }

  removeZIndex() {
    if (this.selectedNode) {
      this.selectedNode.style[CSS_PROPERTIES.Z_INDEX] = 0;
    }
  }

  addZIndex() {
    if (this.selectedNode) {
      this.selectedNode.style[CSS_PROPERTIES.Z_INDEX] = 101;
    }
  }

  removeResizeHandleAndBorder() {
    if (this.selectedNode) {
      this.selectedNode.style.removeProperty('outline');
      const resizeHandlers = this.selectedNode.getElementsByClassName(CONST_VAR.RESIZE_HANDLER_CLASS);
      console.log(resizeHandlers);
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

  moveElementWithMouse(node, canvasElement) {
    let initialX;
    let initialY;

    const mouseMoveListner = (mm) => {
      const canvasBound = this.canvas.nativeElement.getBoundingClientRect();
      node.style.left = mm.clientX - canvasBound.left - initialX + 'px';
      node.style.top = mm.clientY - canvasBound.top - initialY + 'px';
    };

    node.addEventListener('mousedown', (ce) => {
      const targeBound = ce.target.getBoundingClientRect();
      initialX = ce.clientX - targeBound.left;
      initialY = ce.clientY - targeBound.top;
      this.canvas.nativeElement.addEventListener('mousemove', mouseMoveListner);
    });

    document.addEventListener('mouseup', (mu) => {
      canvasElement.style.left = node.style.left;
      canvasElement.style.top = node.style.top;
      this.canvas.nativeElement.removeEventListener('mousemove', mouseMoveListner);
    });
  }

  onItemRemove() {
    const itemIndex = this.project.children.findIndex(t => t === this.selectedItem.canvaElement);
    if (itemIndex > -1) {
      this.project.children.splice(itemIndex, 1);
      this.selectedNode.remove();
      this.toolbarOptions = [];
    }
  }
}
