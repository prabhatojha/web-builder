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
      width: '100%',
      height: '100%',
      position: 'relative'
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
    this.cloneNode(e);
  }

  cloneNode(e) {
    const data = JSON.parse(e.dataTransfer.getData(CONST_VAR.PICKER_ITEM));
    const newNode: any = document.getElementById(data.id).cloneNode(true);
    newNode.id = Hasher.getUuid();
    this.setNodeLocation(e, newNode, data);
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

  buildDom() {

  }

  onItemClick(e) {
    console.log(e.target);
  }
}
