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
import { ElementDimentionModel } from 'src/app/constants/css-constants';
import { ELE_VS_RESIZE_HANDLES } from 'src/app/modules/builder/canvas/canvas.config';
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
      this.moveable.updateRect();
    }
  });

  constructor(private cd: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedNode && this.selectedNode) {
      this.init();
    }
  }

  init() {
    this.unbindPreviousItem();
    this.setInitialSize();
    this.setResizeHandles();
  }

  setResizeHandles() {
    if (this.selectedCanvasElement) {
      this.resizeHanles = ELE_VS_RESIZE_HANDLES[this.selectedCanvasElement.type];
    }
  }

  unbindPreviousItem() {
    if (this.previousSelectedNode && this.previousSelectedCanvasEle.type === ELEMENT_TYPES.TEXT) {
      this.textResizeObserver.unobserve(this.previousSelectedNode.getElementsByTagName('label')[0]);
    }

    this.previousSelectedNode = this.selectedNode;
    this.previousSelectedCanvasEle = this.selectedCanvasElement;
  }

  setInitialSize() {
    this.dimention = CommonUtils.cloneDeep(this.selectedCanvasElement.dimention);

    if (this.selectedCanvasElement.type === ELEMENT_TYPES.TEXT) {
      this.textResizeObserver.observe(this.selectedNode.getElementsByTagName('label')[0]);
    }
  }

  onResizeStart({ dragStart, setOrigin }) {
    this.manualResize = true;
    setOrigin(['%', '%']);
    dragStart.set([this.dimention.translateX, this.dimention.translateY]);
  }

  onResize(e) {
    const { width, height } = e;
    this.dimention.width = width;
    this.dimention.height = height;
    this.dimention.translateX = e.drag.beforeTranslate[0];
    this.dimention.translateY = e.drag.beforeTranslate[1];
    this.updateNodeDimention();
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

  updateNodeDimention(permanent = false) {
    CanvasUtils.applyDimention(this.selectedNode, this.selectedCanvasElement, this.dimention, permanent);
  }

  ngOnDestroy() {
    if (this.previousSelectedNode) {
      this.textResizeObserver.unobserve(this.previousSelectedNode);
    }
  }

  onGroupDrag(e) {
    console.log(e);
  }

  onEnd() {
    this.manualResize = false;
    this.selectedCanvasElement.dimention = CommonUtils.cloneDeep(this.dimention);
  }
}
