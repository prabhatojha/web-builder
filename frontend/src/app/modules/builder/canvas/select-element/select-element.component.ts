import {
  Component, Input, OnChanges, SimpleChanges, ChangeDetectorRef, ViewEncapsulation, OnDestroy,
  ViewChild,
  ElementRef,
  HostListener,
  Output,
  EventEmitter
} from '@angular/core';
import { CanvasElement } from 'src/app/models/canvas.element.model';
import { CanvasUtils } from 'src/app/utils/canvas.utils';
import { ELEMENT_TYPES } from 'src/app/constants/contants';
import Moveable, { MoveableManagerProps } from 'moveable';
import { ElementDimentionModel, CSS_PROPERTIES, ATTR_PROPERTIES, CSS_CLASSES } from 'src/app/constants/css-constants';
import {
  ELE_VS_RESIZE_HANDLES, ELE_VS_KEEP_RATIO, ELE_VS_RESIZABLE, DEFAULT_PROJECT_SIZE
} from 'src/app/modules/builder/canvas/canvas.config';
import { ResizeEventerService } from 'src/app/modules/shared/services/resize-eventer/resize-eventer.service';
import { EventerService, EventModal, EventTypes } from 'src/app/modules/shared/services/eventer.service';
import { filter } from 'rxjs/operators';
import { CSSUtils } from 'src/app/utils/css.utils';
import { CommonUtils } from 'src/app/utils/common.utils';
import { UndoRedoModel, UndoRedoType, UndoService } from 'src/app/modules/shared/services/undo-redo/undo.service';
import { NgxMoveableComponent } from 'ngx-moveable';
import { ARROW_KEYS, KEYBOAR_KEYS } from 'src/app/constants/keyboard-constants';
import { ElementTranform } from 'src/app/models/element.transform.modal';

@Component({
  selector: 'app-select-element',
  templateUrl: './select-element.component.html',
  styleUrls: ['./select-element.component.scss', './select-element.resize.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelectElementComponent implements OnChanges, OnDestroy {

  @Input() selectedNodes: HTMLElement[] = [];
  @Input() projectDimention = DEFAULT_PROJECT_SIZE;
  @Input() guidingElements: Element[] = [];
  @Input() selectedCanvasElements: CanvasElement[] = [];
  @Input() container: any;
  @Input() defaultGroupRotate = 0;

  @ViewChild('moveable', { static: false }) moveable: NgxMoveableComponent;
  @ViewChild('moveableLabel', { static: false }) moveableLabel: ElementRef;

  @Output() groupItems = new EventEmitter<any>();
  @Output() unGroupItems = new EventEmitter<any>();

  previousSelectedNode: any;
  previousSelectedCanvasEle: CanvasElement;

  dimention: ElementDimentionModel = new ElementDimentionModel();
  manualResize: boolean;

  resizeHanles = [];
  directionHandles = [];
  keepRatio = false;
  resiable = true;
  rotatable = true;

  oldStyles: string[] = [];

  MOVE_WITH_KEY = 2;
  transformations: ElementTranform[] = [];

  groupedTranform: ElementTranform;
  groupedDimention: {
    width: number,
    height: number
  };

  horizontalGuideLines = [];
  verticalGuideLines = [];

  constructor(private cd: ChangeDetectorRef, private resizeEventer: ResizeEventerService,
    private eventerService: EventerService, private undoService: UndoService) {
    this.resizeEventer.get().subscribe(event => {
      this.moveable.updateRect();
    });

    this.eventerService.get().subscribe((event: EventModal) => {
      if (event.type === EventTypes.UPDATE_DIRECTION_HANLDES) {
        this.updateDirectionHandle();
      }

      if (event.type === EventTypes.GROUP_ITEMS) {
        this.groupItems.emit({
          items: event.value,
          groupedTranform: this.groupedTranform,
          groupedDimention: this.groupedDimention
        });
      }

      if (event.type === EventTypes.UNGROUP_ITEMS) {
        this.unGroupItems.emit({
          items: event.value,
          groupedTranform: this.groupedTranform,
          groupedDimention: this.groupedDimention
        });
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedNodes && this.selectedNodes && this.selectedNodes.length) {
      this.init();
    }

    if (changes.projectDimention) {
      this.setGuideLines(this.projectDimention);
    }
  }

  setGuideLines({ w, h }) {
    this.horizontalGuideLines = [0, h / 2, h];
    this.verticalGuideLines = [0, w / 2, w];
  }

  init() {
    this.updateDirectionHandle();
    setTimeout(() => {
      this.initTransformation();
    });
  }

  initTransformation() {
    const rect = this.moveable.getRect();
    this.transformations = this.selectedCanvasElements.map(t => {
      const trn = t.transform;

      trn.groupableInfo = CommonUtils.cloneDeep(t.transform);
      trn.groupableInfo.translateX -= rect.left;
      trn.groupableInfo.translateY -= rect.top;
      trn.groupableInfo.rect = rect;
      return trn;
    });

    this.groupedTranform = new ElementTranform();
    this.groupedTranform.translateX = rect.left;
    this.groupedTranform.translateY = rect.top;
    this.groupedDimention = {
      width: rect.offsetWidth,
      height: rect.offsetHeight,
    };
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
        this.rotatable = false;
      } else {
        this.directionHandles = ELE_VS_RESIZE_HANDLES[fistCanvasElement.type];
        this.keepRatio = ELE_VS_KEEP_RATIO[fistCanvasElement.type];
        this.resiable = ELE_VS_RESIZABLE[fistCanvasElement.type];
        this.rotatable = true;
      }
    }
  }

  startCustomDrag(event: any) {
    if (!this.moveable.isMoveableElement(event.target)) {
      this.moveable.ngDragStart(event);
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    this.handleCustomDrag(e);
    this.handleUndoRedo(e);
  }

  handleCustomDrag(e) {
    if (ARROW_KEYS.includes(e.key)) {
      const key = e.key;
      const x = key === KEYBOAR_KEYS.ArrowLeft ? -this.MOVE_WITH_KEY : key === KEYBOAR_KEYS.ArrowRight ? this.MOVE_WITH_KEY : 0;
      const y = key === KEYBOAR_KEYS.ArrowUp ? -this.MOVE_WITH_KEY : key === KEYBOAR_KEYS.ArrowDown ? this.MOVE_WITH_KEY : 0;

      this.moveable.request('draggable', { deltaX: x, deltaY: y }, true);
      e.preventDefault();
    }
  }

  handleUndoRedo(e: KeyboardEvent) {
    if ((e[KEYBOAR_KEYS.COMMAND] || e[KEYBOAR_KEYS.CONTROL]) && e.key === KEYBOAR_KEYS.Z) {
      if (e[KEYBOAR_KEYS.SHIFT] && e.key === KEYBOAR_KEYS.Z) {
        this.undoService.redo();
      } else {
        this.undoService.undo();
      }
      this.moveable.updateRect();
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
    this.onStart();
  }

  onResize(e, index = 0) {
    const { width, height } = e;
    const transform: ElementTranform = this.transformations[index];
    transform.translateX += e.drag.beforeDelta[0];
    transform.translateY += e.drag.beforeDelta[1];
    this.updateNodeCss({
      width,
      height,
      transform: ElementTranform.toCss(transform)
    }, index);
    this.setDisplayLabel(e.clientX, e.clientY, `W : ${width}<br>H : ${height}`);
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
    // target.selec();
    document.execCommand('selectAll', false, null);

    const keyDownListener = (e) => {
      setTimeout(() => {
        this.moveable.updateRect();
      });
      e.stopPropagation();
    };

    const blurListener = () => {
      if (canvasElement.locked) {
        return;
      }
      target.removeAttribute(ATTR_PROPERTIES.CONTENT_EDITABLE);
      canvasElement.children[0].innerText = target.innerText;

      target.removeEventListener('blur', blurListener);
      target.removeEventListener('keydown', keyDownListener);
    };

    target.addEventListener('blur', blurListener);
    target.addEventListener('keydown', keyDownListener);
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

  onDrag(e, index = 0) {
    const transform: ElementTranform = this.transformations[index];
    this.updateTranslate(transform, e.beforeDelta);
    this.updateNodeCss({
      transform: ElementTranform.toCss(transform)
    }, index);
  }

  onGroupDrag(e) {
    e.events.forEach((ev, i) => {
      this.onDrag(ev, i);
    });
    this.updateTranslate(this.groupedTranform, e.beforeDelta);
  }

  onGroupResizeStart({ events }) {
    events.forEach((ev) => {
      ev.setOrigin(['%', '%']);
    });
    this.onStart();
  }

  onGroupResize(e) {
    e.events.forEach((ev, i) => {
      this.onResize(ev, i);
    });

    this.setDisplayLabel(e.clientX, e.clientY, `W : ${e.target.offsetWidth}<br>H : ${e.target.offsetHeight}`);

  }

  onScaleStart(e) {
    const transform: ElementTranform = this.transformations[0];
    e.set([transform.scaleX, transform.scaleY]);
    if (e.dragStart) {
      e.dragStart.set([transform.translateX, transform.translateY]);
    }

    this.onStart();
  }

  onScale(e, showLabel = true, index = 0) {
    const transform: ElementTranform = this.transformations[index];
    transform.translateX = e.drag.beforeTranslate[0];
    transform.translateY = e.drag.beforeTranslate[1];
    this.updatScale(transform, e);

    this.updateNodeCss({
      transform: ElementTranform.toCss(transform)
    }, index);

    if (showLabel) {
      this.setDisplayLabel(e.clientX, e.clientY, `X : ${transform.scaleX.toFixed(2)}<br>Y : ${transform.scaleY.toFixed(2)}`);
    }
  }

  onGroupScaleStart(e) {
    e.events.forEach((item, i) => {
      const transform: ElementTranform = this.transformations[i];
      item.set([transform.scaleX, transform.scaleY]);
      if (item.dragStart) {
        item.dragStart.set([transform.translateX, transform.translateY]);
      }
    });

    this.onStart();
  }

  onGroupScale(e) {
    e.events.forEach((event, i) => {
      this.onScale(event, false, i);
    });

    this.updateGroupTransformScale(e);
    this.setDisplayLabel(e.clientX, e.clientY, `W : ${e.target.offsetWidth}<br>H : ${e.target.offsetHeight}`);
  }

  updateGroupTransformScale(e) {
    this.updatScale(this.groupedTranform, e);
    this.updateTranslate(this.groupedTranform, e.drag.beforeDelta);
  }

  updateTranslate(transform: ElementTranform, values: Array<number>) {
    transform.translateX += values[0];
    transform.translateY += values[1];
  }

  updatScale(transform: ElementTranform, event) {
    transform.scaleX = event.scale[0];
    transform.scaleY = event.scale[1];
  }

  onRotateStart(e) {
    const tranform: ElementTranform = this.transformations[0];
    e.set(tranform.rotate);
    this.onStart();
  }

  onRotate(e) {
    const tranform: ElementTranform = this.transformations[0];
    tranform.rotate = (e.beforeRotate) % 360;
    this.updateNodeCss({
      transform: ElementTranform.toCss(tranform)
    });
    this.setDisplayLabel(e.clientX, e.clientY, `${tranform.rotate} Deg`);
  }

  onClickGroup(e) {
  }

  onRenderGroup(e) {
  }

  onRenderGroupStart(e) {
  }

  onGroupRotateStart(e) {
    console.log(e);
    e.events.forEach((ev, i) => {
      const transform = this.transformations[i];
      ev.set(transform.rotate);
      // tslint:disable-next-line: no-unused-expression
      ev.dragStart && ev.dragStart.set([transform.translateX, transform.translateY]);
    });

    this.onStart();
  }

  onGroupRotate(e) {
    e.events.forEach((event, i) => {
      const transform: ElementTranform = this.transformations[i];
      transform.rotate = event.rotate;
      transform.translateX = event.drag.beforeTranslate[0];
      transform.translateY = event.drag.beforeTranslate[1];
      this.updateNodeCss({
        transform: ElementTranform.toCss(transform)
      }, i);
    });

    this.groupedTranform.rotate = e.rotate % 360;

    const deg = CSSUtils.getRotationValue(document.getElementsByClassName(CSS_CLASSES.MOVEABLE_AREA)[0]);
    this.setDisplayLabel(e.clientX, e.clientY, `${this.groupedTranform.rotate} Deg`);
  }

  setDisplayLabel(clientX, clientY, text) {
    this.moveableLabel.nativeElement.style.cssText = `display: block; transform: translate(${clientX + 20}px,
      ${clientY}px)`;
    this.moveableLabel.nativeElement.innerHTML = text;
  }

  onStart() {
    this.oldStyles = CanvasUtils.getClonedStylesAsText(this.selectedCanvasElements);
  }

  onEnd(e) {
    this.sendToUndoList();
    this.moveableLabel.nativeElement.style.display = 'none';
  }

  sendToUndoList() {
    const newStyles = CanvasUtils.getClonedStylesAsText(this.selectedCanvasElements);

    if (this.oldStyles.toString() !== newStyles.toString()) {
      const item: UndoRedoModel = {
        canvasElements: this.selectedCanvasElements,
        nodes: this.selectedNodes,
        type: UndoRedoType.STYLE,
        oldStyle: this.oldStyles,
        newStyle: newStyles
      };

      this.undoService.add(item);
    }
  }

  ngOnDestroy() {
  }

}
