import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  @ViewChild('canvas', { static: true }) canvas: ElementRef;

  project = {
    tag: 'button',
    style: {
      width: '100px',
      height: '100px',
      background: 'red'
    },
    children: []
  };

  constructor() {
  }

  drag(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
  }

  drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData('text');
    const newNode: any = document.getElementById(data).cloneNode(true);
    newNode.id = 'adfasf';
    ev.target.appendChild(newNode);
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  ngOnInit(): void {
    this.createInitialView();
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
}
