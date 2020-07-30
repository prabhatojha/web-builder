import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

export class NgxElementSelectorEvent {
  selected: HTMLElement[] = [];
  removed: HTMLElement[] = [];
  added: HTMLElement[] = [];
  targets: HTMLElement[] = [];
}

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
  @Input() debounceTime = 2;

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
  private event = new NgxElementSelectorEvent();
  private debouseId;

  constructor() { }

  ngOnInit(): void {
    this.container.addEventListener('mousedown', this.mouseDownListener);
    document.addEventListener('mouseup', this.mouseUpListener);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.targetElements) {
      this.setClickableTargets(changes.targetElements);
    }
  }

  setClickableTargets(changes) {
    console.log('setClickableTargets', changes);
  }

  private mouseDownListener = (e) => {
    this.setRects();
    this.resetOverLay();
    this.setInitialPos(e);
    this.event = new NgxElementSelectorEvent();
    this.event.targets = this.targetElements;
    // this.selectElementWithDebounce(e);
    document.addEventListener('mousemove', this.mouseMoveListener);
    this.onSelectStart.emit(this.event);
  }

  private mouseMoveListener = (e) => {
    const { clientX, clientY } = e;
    this.showOverlay(clientX, clientY);
    this.selectElementWithDebounce(e);
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

  private selectElementWithDebounce(e) {
    clearTimeout(this.debouseId);

    this.debouseId = setTimeout(() => {
      const overlayRect = this.getOverlayRect(e);
      this.rects.forEach((t, index) => this._selectElement(t, overlayRect, index));
    }, this.debounceTime);
  }


  private _selectElement(eleRect, overlayRect, index) {
    const target = this.targetElements[index];
    const selectedInd = this.event.selected.indexOf(target);

    const shouldInclude = this.partiallySelectable ? this.doesIntersect(eleRect, overlayRect)
      : this.doesInclde(eleRect, overlayRect);

    if (shouldInclude) {
      if (selectedInd === -1) {
        this.event.selected.push(target);
        this.event.added.push(target);
        this.event.removed = this.event.removed.filter(t => t !== target);
        this.triggerEvent();
      }
    } else {
      if (selectedInd > -1) {
        this.event.selected.splice(selectedInd, 1);
        this.event.removed.push(this.targetElements[index]);
        this.event.added = this.event.added.filter(t => t !== target);
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

  private getOverlayRect(e) {
    return {
      left: Math.min(this.initialX, e.clientX),
      right: Math.max(this.initialX, e.clientX),
      bottom: Math.max(this.initialY, e.clientY),
      top: Math.min(this.initialY, e.clientY)
    };
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
    this.triggerEndEvent();
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
    this.onSelect.emit(this.event);
  }

  private triggerEndEvent() {
    this.onSelectEnd.emit(this.event);
  }
}
