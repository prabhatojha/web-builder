import {
  Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef, ViewEncapsulation, OnDestroy,
  ViewChild, ElementRef
} from '@angular/core';
import ResizeObserver from 'resize-observer-polyfill';
import { CanvasElement } from 'src/app/models/canvas.element.model';
import { CanvasUtils } from 'src/app/utils/canvas.utils';
import { ELEMENT_TYPES } from 'src/app/constants/contants';
import { CSS_PROPERTIES, CSS_ELEMENT_PROPS } from 'src/app/constants/css-constants';
import Moveable from 'moveable';
@Component({
  selector: 'app-select-element',
  templateUrl: './select-element.component.html',
  styleUrls: ['./select-element.component.scss', './select-element.resize.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelectElementComponent implements OnChanges, OnDestroy {

  @Input() selectedNode: any;
  @Input() selectedCanvasElement: CanvasElement;
  @Input() container: any;

  @ViewChild('moveable', { static: false }) moveable: any;

  resizeObserver = new ResizeObserver((entries: any) => {
    this.moveable.updateRect();
  });

  previousSelectedNode: any;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedNode && this.selectedNode) {
      this.init();
    }
  }

  init() {
    this.unbindPreviousItem();
    this.setInitialSize();
  }

  unbindPreviousItem() {
    if (this.previousSelectedNode) {
      this.resizeObserver.unobserve(this.previousSelectedNode);
    }

    this.previousSelectedNode = this.selectedNode;
  }

  setInitialSize() {
    if (this.selectedCanvasElement.type === ELEMENT_TYPES.TEXT) {
      this.resizeObserver.observe(this.selectedNode);
    }
  }

  onResize(e) {
    this.selectedNode.style.width = e.width + 'px';
    this.selectedNode.style.height = e.height + 'px';

    console.log('Reszing', e);
  }

  dragging(e) {
    this.selectedNode.style.left = e.left + 'px';
    this.selectedNode.style.top = e.top + 'px';
    console.log('Dragging', e);
  }

  setTransform(target) {
    target.style.cssText = this.selectedNode.toCSS();
  }

  rotating(e) {
    this.selectedNode.style.transform = `rotate(${e.dist}deg)`;
    console.log('Rotating', e);
  }

  ngOnDestroy() {
    if (this.previousSelectedNode) {
      this.resizeObserver.unobserve(this.previousSelectedNode);
    }
  }
}
