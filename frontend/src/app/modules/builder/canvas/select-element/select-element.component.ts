import {
  Component, Input, OnChanges, SimpleChanges, ChangeDetectorRef, ViewEncapsulation, OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { CanvasElement } from 'src/app/models/canvas.element.model';
import { CanvasUtils } from 'src/app/utils/canvas.utils';
import { ELEMENT_TYPES } from 'src/app/constants/contants';
import Moveable from 'moveable';
import { ElementDimentionModel, CSS_PROPERTIES, ATTR_PROPERTIES, CSS_CLASSES } from 'src/app/constants/css-constants';
import { ELE_VS_RESIZE_HANDLES, ELE_VS_KEEP_RATIO, ELE_VS_RESIZABLE } from 'src/app/modules/builder/canvas/canvas.config';
import { ResizeEventerService } from 'src/app/modules/shared/services/resize-eventer/resize-eventer.service';
import { EventerService, EventModal, EventTypes } from 'src/app/modules/shared/services/eventer.service';
import { filter } from 'rxjs/operators';
import { CSSUtils } from 'src/app/utils/css.utils';
import { CommonUtils } from 'src/app/utils/common.utils';
import { UndoRedoModel, UndoRedoType, UndoService } from 'src/app/modules/shared/services/undo-redo/undo.service';

@Component({
  selector: 'app-select-element',
  templateUrl: './select-element.component.html',
  styleUrls: ['./select-element.component.scss', './select-element.resize.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelectElementComponent implements OnChanges, OnDestroy {

  @Input() selectedNodes: HTMLElement[] = [];
  @Input() guidingElements: HTMLElement[] = [];
  @Input() selectedCanvasElements: CanvasElement[] = [];
  @Input() container: any;
  @Input() defaultGroupRotate = 0;

  @ViewChild('moveable', { static: false }) moveable: Moveable;
  @ViewChild('moveableLabel', { static: false }) moveableLabel: ElementRef;

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

  constructor(private cd: ChangeDetectorRef, private resizeEventer: ResizeEventerService, private eventerService: EventerService,
    private undoService: UndoService) {
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
        this.rotatable = false;
      } else {
        this.directionHandles = ELE_VS_RESIZE_HANDLES[fistCanvasElement.type];
        this.keepRatio = ELE_VS_KEEP_RATIO[fistCanvasElement.type];
        this.resiable = ELE_VS_RESIZABLE[fistCanvasElement.type];
        this.rotatable = true;
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
    this.onStart();
  }

  onResize(e) {
    const { width, height } = e;
    this.updateNodeCss({
      width,
      height,
      transform: e.drag.transform
    });
    this.setDisplayLabel(e.clientX, e.clientY, `W : ${width}<br>H : ${height}`);
  }

  onScaling(e) {
    this.updateNodeCss({
      transform: e.drag.transform + ` scale(${e.scale[0]}, ${e.scale[1]})`
    });
    this.setDisplayLabel(e.clientX, e.clientY, `X : ${e.scale[0].toFixed(2)}<br>Y : ${e.scale[1].toFixed(2)}`);
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

    const keyDownListener = () => {
      setTimeout(() => {
        this.moveable.updateRect();
      });
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

  dragging(e) {
    this.updateNodeCss({
      transform: e.transform
    });
  }

  rotating(e) {
    this.updateNodeCss({
      transform: e.transform
    });
    const deg = CSSUtils.getRotationValue(this.getFirstNode());
    this.setDisplayLabel(e.clientX, e.clientY, `${deg} Deg`);
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
    this.onStart();
  }

  onGroupResize(e) {
    e.events.forEach((ev, i) => {
      this.updateNodeCss({
        width: ev.width,
        height: ev.height,
        transform: ev.drag.transform
      }, i);
    });

    this.setDisplayLabel(e.clientX, e.clientY, `W : ${e.target.offsetWidth}<br>H : ${e.target.offsetHeight}`);

  }

  onGroupScale(e) {
    e.events.forEach((ev, i) => {
      this.updateNodeCss({
        transform: ev.drag.transform + ` scale(${ev.scale[0]}, ${ev.scale[1]})`
      }, i);
    });

    this.setDisplayLabel(e.clientX, e.clientY, `W : ${e.target.offsetWidth}<br>H : ${e.target.offsetHeight}`);
  }

  onGroupRotate(e) {
    e.events.forEach((ev, i) => {
      this.updateNodeCss({
        transform: ev.drag.transform + ` rotate(${ev.rotate}deg)`
      }, i);
    });

    const deg = CSSUtils.getRotationValue(document.getElementsByClassName(CSS_CLASSES.MOVEABLE_AREA)[0]);
    this.setDisplayLabel(e.clientX, e.clientY, `${deg} Deg`);
  }

  setDisplayLabel(clientX, clientY, text) {
    this.moveableLabel.nativeElement.style.cssText = `display: block; transform: translate(${clientX}px,
      ${clientY - 10}px) translate(-100%, -100%) translateZ(-100px);`;
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
