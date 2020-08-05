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
import { CSSUtils } from 'src/app/utils/css.utils';
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
  @Input() defaultGroupRotate = 0;

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
      // this.dimention.height = entries[0].contentRect.height;
      // this.updateNodeDimention(true);
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
    // this.setInitialSize();
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
  }

  onResize(e) {
    const { width, height } = e;
    // this.dimention.width = width;
    // this.dimention.height = height;
    // this.dimention.translateX = e.drag.beforeTranslate[0];
    // this.dimention.translateY = e.drag.beforeTranslate[1];
    this.updateNodeCss({
      width,
      height,
      transform: e.drag.transform
    });
  }

  dragging(e) {
    const { left, top } = e;
    // this.dimention.translateX = left;
    // this.dimention.translateY = top;
    this.updateNodeCss({
      transform: e.transform
    });
    // this.updateNodeDimention();
  }

  rotating(e) {
    // this.dimention.rotate += e.beforeDelta;
    this.updateNodeCss({
      transform: e.transform
    });
    // this.updateNodeDimention();
  }

  updateNodeCss(styles, index = 0) {
    CanvasUtils.applyCss(this.selectedNodes[index], this.selectedCanvasElements[index], styles, true);
  }

  // updateNodeDimention(permanent = false) {
  //   CanvasUtils.applyDimention(this.selectedNodes[0], this.selectedCanvasElements[0], this.dimention, permanent);
  // }

  onGroupDrag({ events }) {
    events.forEach((ev, i) => {
      this.updateNodeCss({
        transform: ev.transform
      }, i);
    });
  }

  onGroupResizeStart({ events }) {
    events.forEach((ev) => {
      ev.setOrigin(['%', '%']);
    });
  }

  onGroupResize({ events }) {
    events.forEach((ev, i) => {
      this.updateNodeCss({
        width: ev.width,
        height: ev.height,
        transform: ev.drag.transform
      }, i);
    });
  }

  onGroupRotateStart(e) {
    // e.events.forEach((ev, i) => {
    //   const styles = this.selectedCanvasElements[i].style;
    //   const val = CSSUtils.getTransformValue(styles[CSS_PROPERTIES.TRANSFORM], 'rotate');
    //   ev.set(val);
    //   // tslint:disable-next-line: no-unused-expression
    //   // ev.dragStart && ev.dragStart.set(this.frames[i].translate);
    // });
  }

  onGroupRotate({ events }) {
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

  myEnd(e) {
    // console.log(e);
  }

  onGroupClick(e) {
    console.log(e);
  }

  onClickGroup(e) {
    console.log(e);
  }

  ngOnDestroy() {
    if (this.previousSelectedNode) {
      this.textResizeObserver.unobserve(this.previousSelectedNode);
    }
  }

}
