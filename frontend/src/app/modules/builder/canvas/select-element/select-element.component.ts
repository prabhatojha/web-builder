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

  @ViewChild('handleRef') handleRef: ElementRef;
  @ViewChild('moveable', { static: false }) moveable: any;

  zIndex: any;

  resizeObserver = new ResizeObserver((entries: any) => {
    console.log('Resize Observer');
    const rect = entries[0].contentRect;
    this.styles = Object.assign(this.styles, { height: rect.height + 'px' });
    this.cd.detectChanges();
  });

  styles: any = {};
  subsribedListeners = {
    MOUSE_DOWN: 'mousedown'
  };

  previousSelectedNode: any;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedNode && this.selectedNode) {
      this.init();
    }
  }

  init() {
    // this.setZIndex();
    // this.unbindPreviousItem();
    this.setInitialSize();
  }

  // setZIndex() {
  //   this.zIndex = this.selectedNode.style[CSS_PROPERTIES.Z_INDEX] || 0;
  // }

  // unbindPreviousItem() {
  //   if (this.previousSelectedNode) {
  //     this.resizeObserver.unobserve(this.previousSelectedNode);
  //   }

  //   this.previousSelectedNode = this.selectedNode;
  // }

  setInitialSize() {
    // const { top, left, width } = this.selectedNode.style;
    // this.styles = { top, left, width, height: this.selectedNode.offsetHeight + 'px' };

    // console.log('Set Initial Size', this.styles);
    // if (this.selectedCanvasElement.type === ELEMENT_TYPES.TEXT) {
    //   this.resizeObserver.observe(this.selectedNode);
    // }

    if (this.moveable) {
      console.log('Updating Rect');
      // this.moveable.updateRect();
    }
  }

  // resizing(e) {
  //   console.log('Resizing', this.getHanlerOffsets());
  //   CanvasUtils.applyCss(this.selectedNode, this.selectedCanvasElement, this.getHanlerOffsets());
  // }

  // getHanlerOffsets() {
  //   const el = this.handleRef.nativeElement;
  //   const left = el.offsetLeft;
  //   const top = el.offsetTop;
  //   const width = el.offsetWidth;
  //   const height = el.offsetHeight;
  //   return { left, top, width, height };
  // }

  // resizingStop(e) {

  // }

  // onDragging(e) {
  //   console.log('Dragging', e);
  //   CanvasUtils.applyCss(this.selectedNode, this.selectedCanvasElement, { left: e.x, top: e.y });
  // }

  // getResizeStyle(e) {
  //   let { left, top } = e.position;
  //   const { width, height } = e.size;

  //   left = this.selectedNode[CSS_ELEMENT_PROPS.offsetLeft] + left;
  //   top = this.selectedNode[CSS_ELEMENT_PROPS.offsetTop] + top;

  //   return { top, left, width, height };
  // }

  // New Implementation start

  onResize(e) {
    this.selectedNode.style.width = e.width + 'px';
    this.selectedNode.style.height = e.height + 'px';

    console.log('Reszing', e);
    // console.log('Reszing - Rect', this.moveable.getRect());
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
