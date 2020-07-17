import {
  Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef, ViewEncapsulation, OnDestroy,
  ViewChild, ElementRef
} from '@angular/core';
import ResizeObserver from 'resize-observer-polyfill';
import { CanvasElement } from 'src/app/models/canvas.element.model';
import { CanvasUtils } from 'src/app/utils/canvas.utils';
import { ELEMENT_TYPES } from 'src/app/constants/contants';
import { CSS_PROPERTIES, CSS_ELEMENT_PROPS, ElementDimentionModel } from 'src/app/constants/css-constants';
import Moveable from 'moveable';
import { CommonUtils } from 'src/app/utils/common.utils';
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

  dimention: ElementDimentionModel = new ElementDimentionModel();

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
    this.dimention = CommonUtils.cloneDeep(this.selectedCanvasElement.dimention);

    if (this.selectedCanvasElement.type === ELEMENT_TYPES.TEXT) {
      this.resizeObserver.observe(this.selectedNode);
    }
  }

  onResizeStart({ dragStart, setOrigin }) {
    setOrigin(['%', '%']);
    dragStart.set([this.dimention.translateX, this.dimention.translateY]);
  }

  // onResize({ target, width, height, isPinch, drag }: OnResize) {
  //   this.frame.set("width", `${width}px`);
  //   this.frame.set("height", `${height}px`);
  //   this.frame.set("transform", "translateX", `${drag.beforeTranslate[0]}px`);
  //   this.frame.set("transform", "translateY", `${drag.beforeTranslate[1]}px`);
  //   this.setTransform(target);
  //   console.log(width, height);
  // }

  onResize(e) {
    const { width, height } = e;
    this.dimention.width = width;
    this.dimention.height = height;
    this.dimention.translateX = e.drag.beforeTranslate[0];
    this.dimention.translateY = e.drag.beforeTranslate[1];
    // this.frame.set("transform", "translateX", `${drag.beforeTranslate[0]}px`);
    // this.frame.set("transform", "translateY", `${drag.beforeTranslate[1]}px`);

    this.updateNodeDimention();
    console.log(e.drag);
  }

  dragging(e) {
    const { left, top } = e;
    this.dimention.translateX = left;
    this.dimention.translateY = top;
    this.updateNodeDimention();
  }

  onRotateStart(e) {
  }

  rotating(e) {
    this.dimention.rotate += e.beforeDelta;
    this.updateNodeDimention();
  }

  updateNodeCss(styles) {
    CanvasUtils.applyCss(this.selectedNode, this.selectedCanvasElement, styles);
  }

  updateNodeDimention() {
    CanvasUtils.applyDimention(this.selectedNode, this.selectedCanvasElement, this.dimention);
  }

  ngOnDestroy() {
    if (this.previousSelectedNode) {
      this.resizeObserver.unobserve(this.previousSelectedNode);
    }
  }
}
