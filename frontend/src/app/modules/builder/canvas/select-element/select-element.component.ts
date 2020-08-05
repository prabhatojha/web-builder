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
import { ELE_VS_RESIZE_HANDLES, ELE_VS_KEEP_RATIO, ELE_VS_RESIZABLE } from 'src/app/modules/builder/canvas/canvas.config';
import { CSSUtils } from 'src/app/utils/css.utils';
import textFit from 'textfit';

@Component({
  selector: 'app-select-element',
  templateUrl: './select-element.component.html',
  styleUrls: ['./select-element.component.scss', './select-element.resize.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelectElementComponent implements OnChanges, OnDestroy {

  @Input() selectedNodes: HTMLElement[] = [];
  @Input() selectedCanvasElements: CanvasElement[] = [];
  @Input() container: any;
  @Input() defaultGroupRotate = 0;

  @ViewChild('moveable', { static: false }) moveable: Moveable;

  previousSelectedNode: any;
  previousSelectedCanvasEle: CanvasElement;

  dimention: ElementDimentionModel = new ElementDimentionModel();
  manualResize: boolean;

  resizeHanles = [];
  directionHandles = [];
  keepRatio = false;
  resiable = true;

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
    if (changes.selectedNodes && this.selectedNodes && this.selectedNodes.length) {
      this.init();
    }
  }

  init() {
    this.updateDirectionHandle();
    // this.updateKeepRatio();
  }

  updateDirectionHandle() {
    if (this.isMultipleItems()) {
      this.directionHandles = ELE_VS_RESIZE_HANDLES[ELEMENT_TYPES.MULTIPLE_SELECTION];
      this.keepRatio = ELE_VS_KEEP_RATIO[ELEMENT_TYPES.MULTIPLE_SELECTION];
      this.resiable = ELE_VS_RESIZABLE[ELEMENT_TYPES.MULTIPLE_SELECTION];
    } else {
      const fistCanvasElement = this.getFirstCanvasElement();
      this.directionHandles = ELE_VS_RESIZE_HANDLES[fistCanvasElement.type];
      this.keepRatio = ELE_VS_KEEP_RATIO[fistCanvasElement.type];
      this.resiable = ELE_VS_RESIZABLE[fistCanvasElement.type];
    }
  }

  getFirstCanvasElement() {
    return this.selectedCanvasElements[0];
  }
  getFirstNode() {
    return this.selectedNodes[0];
  }

  isMultipleItems() {
    return this.selectedCanvasElements.length > 1;
  }

  onResizeStart(e) {
    this.manualResize = true;
    e.setOrigin(['%', '%']);
  }

  onResize(e) {
    console.log('Resize', e);
    const { width, height } = e;
    this.updateNodeCss({
      width,
      height,
      transform: e.drag.transform
    });

    // if (this.getFirstCanvasElement().type === ELEMENT_TYPES.TEXT) {
    //   textFit(this.getFirstNode(), {
    //     reProcess: false,
    //     detectMultiLine: false
    //   });
    //   // fitty(this.getFirstNode());
    // }
  }

  onScaling(e) {
    console.log('Scale', e);
    this.updateNodeCss({
      transform: e.drag.transform + ` scale(${e.scale[0]}, ${e.scale[1]})`
    });
  }

  dragging(e) {
    const { left, top } = e;

    this.updateNodeCss({
      transform: e.transform
    });
  }

  rotating(e) {
    this.updateNodeCss({
      transform: e.transform
    });
  }

  updateNodeCss(styles, index = 0) {
    CanvasUtils.applyCss(this.selectedNodes[index], this.selectedCanvasElements[index], styles, true);
  }

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

  onGroupScale({ events }) {
    events.forEach((ev, i) => {
      this.updateNodeCss({
        transform: ev.drag.transform + ` scale(${ev.scale[0]}, ${ev.scale[1]})`
      }, i);
    });
  }

  onGroupRotate({ events }) {
    events.forEach((ev, i) => {
      this.updateNodeCss({
        transform: ev.drag.transform + ` rotate(${ev.rotate}deg)`
      }, i);
    });
  }

  ngOnDestroy() {
    if (this.previousSelectedNode) {
      this.textResizeObserver.unobserve(this.previousSelectedNode);
    }
  }

}
