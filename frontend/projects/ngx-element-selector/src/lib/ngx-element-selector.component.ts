import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

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
  @Input() partiallySelectable = true;
  @Input() keyboardKey = 'ctrl';
  @Input() debounceTime = 10;

  @Output() onSelectStart = new EventEmitter<any>();
  @Output() onSelect = new EventEmitter<any>();
  @Output() onSelectEnd = new EventEmitter<any>();

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
  private debouseId;

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
    this.selectedElements = [];
    document.addEventListener('mousemove', this.mouseMoveListener);
  }

  private mouseMoveListener = (e) => {
    const { clientX, clientY } = e;
    this.showOverlay(clientX, clientY);
    this.selectElementWithDebounce();
  }

  private showOverlay(clientX, clientY) {
    const left = Math.min(this.initialX, clientX) + this.container.scrollLeft - this.containerRect.left;
    const top = Math.min(this.initialY, clientY) + this.container.scrollTop - this.containerRect.top;

    this.styles = {
      left: this.toPx(left),
      top: this.toPx(top),
      width: this.toPx(Math.abs(clientX - this.initialX)),
      height: this.toPx(Math.abs(clientY - this.initialY)),
    };
  }

  private selectElementWithDebounce() {
    clearTimeout(this.debouseId);

    this.debouseId = setTimeout(() => {
      const overlayRect = this.getOverlayRect();
      this.rects.forEach((t, index) => this._selectElement(t, overlayRect, index));
    }, this.debounceTime);
  }


  private _selectElement(eleRect, overlayRect, index) {
    const selectedInd = this.selectedElements.indexOf(this.targetElements[index]);

    const shouldInclude = this.partiallySelectable ? this.doesIntersect(eleRect, overlayRect)
      : this.doesInclde(eleRect, overlayRect);

    if (shouldInclude) {
      if (selectedInd === -1) {
        this.selectedElements.push(this.targetElements[index]);
        this.triggerEvent();
      }
    } else {
      if (selectedInd > -1) {
        this.selectedElements.splice(selectedInd, 1);
        this.triggerEvent();
      }
    }
  }

  doesIntersect(eleRect: DOMRect, overlayRect) {
    return overlayRect.left < eleRect.right && overlayRect.right > eleRect.left &&
      overlayRect.top < eleRect.bottom && overlayRect.bottom > eleRect.top;
  }

  doesInclde(eleRect: DOMRect, overlayRect) {
    return overlayRect.left < eleRect.left && overlayRect.top < eleRect.top &&
      overlayRect.right > eleRect.right && overlayRect.bottom > eleRect.bottom;
  }

  private getOverlayRect(): DOMRect {
    return this.overlay && this.overlay.nativeElement.getBoundingClientRect();
  }

  public toPx(val) {
    if (typeof val === 'string' && val.includes('px')) {
      return val;
    }

    return val + 'px';
  }

  private mouseUpListener = (e) => {
    this.overlayVisible = false;
    document.removeEventListener('mousemove', this.mouseMoveListener);
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

  private triggerEvent() {
    console.log(this.selectedElements);
    this.onSelect.emit(this.selectedElements);
  }
}
