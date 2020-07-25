import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'ngx-element-selector',
  template: `
    <div class='element-selector-overlay' #overlay [style]="styles" *ngIf="overlayVisible"></div>
  `,
  styleUrls: ['./ngx-element-selector-component.scss']
})
export class NgxElementSelectorComponent implements OnInit, OnChanges {

  @Input() container: HTMLElement = document.documentElement;
  @Input() dragArea: HTMLElement = this.container;
  @Input() targetElements: HTMLElement[];
  @Input() selectAsWhole = false;
  @Input() keyboardKey = 'ctrl';
  @Input() setGroupBorder = false;

  @ViewChild('overlay') overlay: ElementRef;

  overlayVisible = false;
  styles: {
    left: string,
    top: string,
    width: string,
    height: string
  } = { left: '0px', top: '0px', width: '0px', height: '0px' };

  private initialX = 0;
  private initialY = 0;
  private containerRect: DOMRect;
  private rects = [];
  private selectedElements = [];

  constructor() { }

  ngOnInit(): void {
    this.container.addEventListener('mousedown', this.mouseDownListener);
    document.addEventListener('mouseup', this.mouseUpListener);
  }


  ngOnChanges(changes: SimpleChanges): void {
  }

  private mouseDownListener = (e) => {
    this.setRects();
    this.resetOverLay();
    this.setInitialPos(e);
    this.container.addEventListener('mousemove', this.mouseMoveListener);
  }

  private mouseMoveListener = (e) => {
    const { clientX, clientY } = e;
    this.showOverlay(clientX, clientY);
    this.selectElements();
  }

  private showOverlay(clientX, clientY) {
    const left = Math.min(this.initialX, clientX) - this.containerRect.left;
    const top = Math.min(this.initialY, clientY) - this.containerRect.top;

    this.styles = {
      left: this.toPx(left),
      top: this.toPx(top),
      width: this.toPx(Math.abs(clientX - this.initialX)),
      height: this.toPx(Math.abs(clientY - this.initialY)),
    };
  }

  private selectElements() {
    const overlayRect = this.getOverlayRect();
    this.rects.forEach((t, index) => this._selectElement(t, overlayRect, index));
  }


  private _selectElement(eleRect, overlayRect, index) {
    console.log(eleRect);
    console.log(overlayRect);
  }

  private getOverlayRect(): DOMRect {
    return this.overlay.nativeElement.getBoundingClientRect();
  }

  public toPx(val) {
    if (typeof val === 'string' && val.includes('px')) {
      return val;
    }

    return val + 'px';
  }

  private mouseUpListener = (e) => {
    this.overlayVisible = false;
    this.container.removeEventListener('mousemove', this.mouseMoveListener);
  }

  private setRects() {
    this.rects = [];
    for (const ele of this.targetElements) {
      this.rects.push(ele.getBoundingClientRect());
    }
  }

  private resetOverLay() {
    this.styles = { left: '0px', top: '0px', width: '0px', height: '0px' };
    this.overlayVisible = true;
  }

  private setInitialPos(e) {
    this.initialX = e.clientX;
    this.initialY = e.clientY;
    this.containerRect = this.container.getBoundingClientRect();
  }
}
