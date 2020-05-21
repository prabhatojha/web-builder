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
    }
  }

  attachEventListner(node, item, canvasElement) {
    this.moveElementWithMouse(node, canvasElement);
    this.selectElement(node, item);
  }

  selectElement(node, item) {
    this.showToolBar(node, item);
    node.addEventListener('click', () => {
      this.showToolBar(node, item);
    });
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

  onItemSelect(e) {
  }
}
