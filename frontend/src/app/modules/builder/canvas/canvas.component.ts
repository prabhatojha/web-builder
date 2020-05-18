import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CONST_VAR } from 'src/app/constants/contants';
import { Hasher } from 'src/app/constants/hasher';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas', { static: true }) canvas: ElementRef;

  canvasOffsetLeft: number;
  canvasOffsetTop: number;

  project = {
    tag: 'div',
    style: {
      width: '400px',
      height: '500px',
      position: 'relative',
      background: 'white'
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
    const ele = document.createElement(this.project.tag);

    Object.keys(this.project.style).forEach(key => {
      ele.style[key] = this.project.style[key];
    });

    this.canvas.nativeElement.appendChild(ele);
    console.log(ele);
  }

  buildDom(node) {
    const ele = document.createElement(node.tag);
    this.addElementStyle(ele, node.style);
    this.addInnerText(ele, node.innerText);

    if (node.children) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < node.children.length; i++) {
        ele.appendChild(this.buildDom(node.children[i]));
      }
    }

    return ele;
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

  onItemClick(e) {
    console.log(e.target);
  }

  attachEventListner(e, node, item) {

    this.moveElementWithMouse(node);
    // node.draggable = true;
    // let initialClientX;
    // let initialClientY;

    // node.ondragstart = (de: any) => {
    //   initialClientX = de.clientX;
    //   initialClientY = de.clientY;
    //   // const bound = de.target.getBoundingClientRect();

    //   // de.dataTransfer.setData(CONST_VAR.PICKER_ITEM,
    //   //   JSON.stringify({
    //   //     left: de.clientX - bound.left,
    //   //     top: de.clientY - bound.top,
    //   //     item
    //   //   }));
    // };

    // node.ondrag = (ode: any) => {
    //   node.left = initialClientX - ode.clientX;
    //   node.top = initialClientY - ode.clientY;
    // }
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
}
