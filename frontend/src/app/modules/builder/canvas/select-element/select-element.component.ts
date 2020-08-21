import {
  Component, Input, OnChanges, SimpleChanges, ChangeDetectorRef, ViewEncapsulation, OnDestroy,
  ViewChild
} from '@angular/core';
import { CanvasElement } from 'src/app/models/canvas.element.model';
import { CanvasUtils } from 'src/app/utils/canvas.utils';
import { ELEMENT_TYPES } from 'src/app/constants/contants';
import Moveable from 'moveable';
import { ElementDimentionModel, CSS_PROPERTIES, ATTR_PROPERTIES } from 'src/app/constants/css-constants';
import { ELE_VS_RESIZE_HANDLES, ELE_VS_KEEP_RATIO, ELE_VS_RESIZABLE } from 'src/app/modules/builder/canvas/canvas.config';
import { ResizeEventerService } from 'src/app/modules/shared/services/resize-eventer/resize-eventer.service';
import { EventerService, EventModal, EventTypes } from 'src/app/modules/shared/services/eventer.service';
import { filter } from 'rxjs/operators';

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

  constructor(private cd: ChangeDetectorRef, private resizeEventer: ResizeEventerService, private eventerService: EventerService) {
    this.resizeEventer.get().subscribe(event => {
      this.moveable.updateRect();
    });

    this.eventerService.get().subscribe((event: EventModal) => {
      if (event.type === EventTypes.UPDATE_DIRECTION_HANLDES) {
        this.updateDirectionHandle();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedNodes && this.selectedNodes && this.selectedNodes.length) {
      this.init();
    }
  }

  init() {
    this.updateDirectionHandle();
  }

  updateDirectionHandle() {
    if (this.isMultipleItems()) {
      this.directionHandles = ELE_VS_RESIZE_HANDLES[ELEMENT_TYPES.MULTIPLE_SELECTION];
      this.keepRatio = ELE_VS_KEEP_RATIO[ELEMENT_TYPES.MULTIPLE_SELECTION];
      this.resiable = ELE_VS_RESIZABLE[ELEMENT_TYPES.MULTIPLE_SELECTION];
    } else {
      const fistCanvasElement = this.getFirstCanvasElement();
      if (fistCanvasElement.locked) {
        this.directionHandles = [];
      } else {
        this.directionHandles = ELE_VS_RESIZE_HANDLES[fistCanvasElement.type];
        this.keepRatio = ELE_VS_KEEP_RATIO[fistCanvasElement.type];
        this.resiable = ELE_VS_RESIZABLE[fistCanvasElement.type];
      }
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
    const { width, height } = e;
    this.updateNodeCss({
      width,
      height,
      transform: e.drag.transform
    });
  }

  onScaling(e) {
    this.updateNodeCss({
      transform: e.drag.transform + ` scale(${e.scale[0]}, ${e.scale[1]})`
    });
  }

  onElementClick(e) {
    if (e.isDouble) {
      this.editTextElement(e.inputTarget);
    }
  }

  editTextElement(target: HTMLElement) {
    const canvasElement = this.getFirstCanvasElement();

    if (canvasElement.locked || canvasElement.type !== ELEMENT_TYPES.TEXT) {
      return;
    }

    target.setAttribute(ATTR_PROPERTIES.CONTENT_EDITABLE, 'true');
    target.focus();

    const blurListener = () => {
      if (canvasElement.locked) {
        return;
      }
      target.removeAttribute(ATTR_PROPERTIES.CONTENT_EDITABLE);
      canvasElement.children[0].innerText = target.innerText;

      target.removeEventListener('blur', blurListener);
    };

    target.addEventListener('blur', blurListener);
  }

  dragging(e) {
    e.inputEvent.stopPropagation();
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
    const canvasElement = this.selectedCanvasElements[index];
    if (canvasElement.locked) {
      return;
    }
    this.preProcessStyles(canvasElement, styles);
    CanvasUtils.applyCss(this.selectedNodes[index], canvasElement, styles, true);
  }

  preProcessStyles(canvasElement: CanvasElement, styles) {

    // If element is of type text or line, we do not need height
    if ([ELEMENT_TYPES.TEXT, ELEMENT_TYPES.LINE].includes(canvasElement.type)) {
      delete styles[CSS_PROPERTIES.HEIGHT];
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
  }

}
