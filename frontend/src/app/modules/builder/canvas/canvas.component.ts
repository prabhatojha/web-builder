import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { CONST_VAR } from 'src/app/constants/contants';
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
    const bound = this.canvas.nativeElement.getBoundingClientRect();
    this.canvasOffsetLeft = bound.left;
    this.canvasOffsetTop = bound.top;
  }

  drag(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
  }

  drop(e) {
    e.preventDefault();
    this.addNewNode(e, e.dataTransfer.getData(CONST_VAR.PICKER_ITEM));
    // this.cloneNode(e);
  }

  addNewNode(e, unparseData) {

    if (!unparseData) {
      return;
    }

    const data = JSON.parse(unparseData);
    const newNode = this.buildDom(data.item.canvaElement);
    this.setNodeLocation(e, newNode, data);
    this.attachEventListner(e, newNode, data.item);
    e.target.appendChild(newNode);
  }

  setNodeLocation(e, newNode: any, data) {
    const canvasBound = e.srcElement.getBoundingClientRect();
    newNode.style.left = (e.clientX - canvasBound.left - data.left) + 'px';
    newNode.style.top = e.clientY - canvasBound.top - data.top + 'px';
  }

  allowDrop(e) {
    e.preventDefault();
  }

  ngOnInit(): void {
    this.createInitialView();
  }

  createInitialView() {
    const node = this.buildDom(this.project);
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
    }
  }

  attachEventListner(e, node, item) {
    this.moveElementWithMouse(node);
    this.selectElement(node, item);
  }

  selectElement(node, item) {
    node.addEventListener('click', () => {
      this.showToolBar(node, item);
    });
  }

  showToolBar(node, item) {
    console.log(item.toolbarOptions);
    this.toolbarOptions = item.toolbarOptions;
    this.selectedNode = node;
    this.selectedItem = item;
  }

  moveElementWithMouse(node) {
    let initialX;
    let initialY;
    let isDragging = false;

    const mouseMoveListner = (mm) => {
      if (isDragging) {
        const canvasBound = this.canvas.nativeElement.getBoundingClientRect();
        console.log(initialX, initialY);
        node.style.left = mm.clientX - canvasBound.left - initialX + 'px';
        node.style.top = mm.clientY - canvasBound.top - initialY + 'px';
      }
    };

    node.addEventListener('mousedown', (ce) => {
      isDragging = true;

      const targeBound = ce.target.getBoundingClientRect();
      initialX = ce.clientX - targeBound.left;
      initialY = ce.clientY - targeBound.top;
      this.canvas.nativeElement.addEventListener('mousemove', mouseMoveListner);
    });

    document.addEventListener('mouseup', (mu) => {
      isDragging = false;
      this.canvas.nativeElement.removeEventListener('mousemove', mouseMoveListner);
    });
  }

  onItemSelect(e) {
    console.log(e);
  }
}
