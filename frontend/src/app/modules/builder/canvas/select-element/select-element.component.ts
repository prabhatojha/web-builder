import {
  Component, Input, OnChanges, SimpleChanges, ChangeDetectorRef, ViewEncapsulation, OnDestroy,
  ViewChild
} from '@angular/core';
import ResizeObserver from 'resize-observer-polyfill';
import { CanvasElement } from 'src/app/models/canvas.element.model';
import { CanvasUtils } from 'src/app/utils/canvas.utils';
import { ELEMENT_TYPES } from 'src/app/constants/contants';
import Moveable from 'moveable';
import { CommonUtils } from 'src/app/utils/common.utils';
import { ElementDimentionModel, CSS_PROPERTIES } from 'src/app/constants/css-constants';
import { ELE_VS_RESIZE_HANDLES } from 'src/app/modules/builder/canvas/canvas.config';
@Component({
  selector: 'app-select-element',
  templateUrl: './select-element.component.html',
  styleUrls: ['./select-element.component.scss', './select-element.resize.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelectElementComponent implements OnChanges, OnDestroy {

  @Input() selectedNodes: any;
  @Input() selectedCanvasElements: CanvasElement[] = [];
  @Input() container: any;

  @ViewChild('moveable', { static: false }) moveable: Moveable;

  previousSelectedNode: any;
  previousSelectedCanvasEle: CanvasElement;

  dimention: ElementDimentionModel = new ElementDimentionModel();
  manualResize: boolean;

  resizeHanles = [];

  textResizeObserver = new ResizeObserver((entries: any) => {
    const rect = entries && entries[0].contentRect;

    // If user is doing resize, do not trigger this change
    if (rect && !this.manualResize) {
      this.dimention.height = entries[0].contentRect.height;
      this.updateNodeDimention(true);
      // tslint:disable-next-line: no-unused-expression
      this.moveable && this.moveable.updateRect();
    }
  });

  constructor(private cd: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedNodes && this.selectedNodes) {
      this.init();
    }
  }

  init() {
    // this.unbindPreviousItem();
    this.setInitialSize();
    // this.setResizeHandles();
  }

  setResizeHandles() {
    if (this.selectedCanvasElements && this.selectedCanvasElements[0]) {
      this.resizeHanles = ELE_VS_RESIZE_HANDLES[this.selectedCanvasElements[0].type];
    }
  }

  unbindPreviousItem() {
    if (this.previousSelectedNode && this.previousSelectedCanvasEle.type === ELEMENT_TYPES.TEXT) {
      // this.textResizeObserver.unobserve(this.previousSelectedNode.getElementsByTagName('label')[0]);
    }

    this.previousSelectedNode = this.selectedNodes[0];
    this.previousSelectedCanvasEle = this.selectedCanvasElements[0];
  }

  setInitialSize() {
    this.dimention = this.selectedCanvasElements.length && CommonUtils.cloneDeep(this.selectedCanvasElements[0].dimention);

    // if (this.selectedCanvasElement.type === ELEMENT_TYPES.TEXT) {
    // this.textResizeObserver.observe(this.selectedNodes[0].getElementsByTagName('label')[0]);
    // }
  }

  onResizeStart(e) {
    this.manualResize = true;
    e.setOrigin(['%', '%']);
    console.log(e);
    // e.dragStart.set([this.dimention.translateX, this.dimention.translateY]);
  }

  onResize(e) {
    console.log(e);
    const { width, height } = e;
    this.dimention.width = width;
    this.dimention.height = height;
    this.dimention.translateX = e.drag.beforeTranslate[0];
    this.dimention.translateY = e.drag.beforeTranslate[1];
    // this.updateNodeDimention();
    // console.log(this.selectedNodes[0].style.transform);
    this.updateNodeCss({
      width,
      height,
      transform: e.drag.transform
    });
  }

  dragging(e) {
    console.log(e);
    const { left, top } = e;
    this.dimention.translateX = left;
    this.dimention.translateY = top;
    this.updateNodeCss({
      transform: e.transform
    });
    // this.updateNodeDimention();
  }

  onRotateStart(e) {
    console.log(e.target.style[CSS_PROPERTIES.TRANSFORM].match(/\srotateX\((\d+)\)/i));
    this.dimention.rotate = e.target.style[CSS_PROPERTIES.TRANSFORM].match(/\srotate\((\d+)\)/i);
    console.log(e, e.target.style[CSS_PROPERTIES.TRANSFORM]);
  }

  rotating(e) {
    console.log(e);
    this.dimention.rotate += e.beforeDelta;
    this.updateNodeCss({
      transform: e.transform
    });
    // this.updateNodeDimention();
  }

  updateNodeCss(styles, index = 0) {
    CanvasUtils.applyCss(this.selectedNodes[index], this.selectedCanvasElements[index], styles);
  }

  updateNodeDimention(permanent = false) {
    CanvasUtils.applyDimention(this.selectedNodes[0], this.selectedCanvasElements[0], this.dimention, permanent);
  }

  ngOnDestroy() {
    if (this.previousSelectedNode) {
      this.textResizeObserver.unobserve(this.previousSelectedNode);
    }
  }

  onGroupDrag({ events }) {
    events.forEach((ev, i) => {
      this.updateNodeCss({
        transform: ev.transform
      }, i);
    });
  }

  onGroupResizeStart({ events }) {
    console.log(events);
    events.forEach((ev) => {
      ev.setOrigin(['%', '%']);
    });
  }

  onGroupResize({ events }) {
    console.log(events);
    events.forEach((ev, i) => {
      this.updateNodeCss({
        width: ev.width,
        height: ev.height,
        transform: ev.drag.transform
      }, i);
    });
  }

  onGroupRotate({ events }) {
    console.log(events);
    events.forEach((ev, i) => {
      this.updateNodeCss({
        transform: ev.drag.transform + ` rotate(${ev.rotate}deg)`
      }, i);
    });
  }

  onEnd() {
    this.manualResize = false;
    // this.selectedCanvasElements[0].dimention = CommonUtils.cloneDeep(this.dimention);
  }
}
