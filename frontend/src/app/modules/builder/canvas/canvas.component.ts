import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { CONST_VAR, ELEMENT_TYPES } from 'src/app/constants/contants';
import { CSS_PROPERTIES, ATTR_PROPERTIES, CSS_PROPERTY_VALUES, CSS_CLASSES } from 'src/app/constants/css-constants';
import { EventerService, EventModal, EventTypes } from '../../shared/services/eventer.service';
import { filter } from 'rxjs/operators';
import { CanvasElement } from 'src/app/models/canvas.element.model';
import { ImageUtils } from 'src/app/utils/image.utils';
import { CanvasUtils } from 'src/app/utils/canvas.utils';
import { CommonUtils } from 'src/app/utils/common.utils';
import { NgxElementSelectorEvent } from 'projects/ngx-element-selector/src/public-api';
import { CSSUtils } from 'src/app/utils/css.utils';
import { UndoService, UndoRedoModel, UndoRedoType } from '../../shared/services/undo-redo/undo.service';
import { SelectElementComponent } from './select-element/select-element.component';
import { ElementTranform } from 'src/app/models/element.transform.modal';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CanvasComponent implements OnInit, AfterViewInit {

  @Input() project;

  @Output() openDownloadPopup = new EventEmitter<any>();

  @ViewChild('canvas', { static: true }) canvas: ElementRef;
  @ViewChild('canvasContainer', { static: true }) canvasContainer: ElementRef;
  @ViewChild('selectElementRef', { static: true }) selectElementRef: SelectElementComponent;
  CANVAS_EVENTS = [EventTypes.CANVAS_PREVIEW, EventTypes.CANVAS_DOWNLOAD, EventTypes.CANVAS_ADD_ITEM];

  body = document.body;

  selectedCanvasElement: CanvasElement;
  // Actual dom element of the selected item
  selectedNode: any;
  selectedNodes: Element[];
  selectedCanvasElements: CanvasElement[];

  // Project node is the first canvas element from CANVAS_PROJECT
  projectNode: HTMLElement;
  toolbarOptions = [];



  showPreview = false;

  defaultGroupRotate = 0;

  guidingElements = []; // Is used to set elementGuidelines to ngx-moveable

  constructor(private eventer: EventerService, private undoService: UndoService) {
  }

  ngOnInit(): void {
    this.createInitialView();
    this.subscribeEventer();
  }

  ngAfterViewInit(): void {
  }

  drop(e) {
    e.preventDefault();
    const unparseData = e.dataTransfer.getData(CONST_VAR.PICKER_ITEM);
    if (!unparseData) {
      return;
    }

    const data = JSON.parse(unparseData);
    const canvasElement: CanvasElement = data.item.canvasElement;
    const canvasBound = this.projectNode.getBoundingClientRect();
    CanvasUtils.setInitialNodeLocation(e, data, canvasBound);

    this.addNewNode(canvasElement);
  }

  onDuplicateSelectedItem({ canvasElements }) {
    canvasElements.forEach(element => {
      const newElement = CommonUtils.cloneDeep(element);
      CanvasUtils.setDuplicateNodeLocation(newElement);
      this.addNewNode(newElement);
    });
  }

  addNewNode(canvasElement: CanvasElement) {
    switch (canvasElement.type) {
      case ELEMENT_TYPES.BACKGROUND:
        this.handleBackgroundChange(canvasElement);
        break;
      default:
        this.handleGenericElements(canvasElement);
    }
  }

  handleBackgroundChange(canvasElement: CanvasElement) {
    const oldStyle = {
      [CSS_PROPERTIES.BG]: this.project.canvasElement.style[CSS_PROPERTIES.BG]
    };
    const newStyle = {
      [CSS_PROPERTIES.BG]: canvasElement.style[CSS_PROPERTIES.BG]
    };

    CanvasUtils.applyCss(this.projectNode, this.project.canvasElement, newStyle, true);

    this.undoService.add({
      canvasElements: [this.project.canvasElement],
      nodes: [this.projectNode],
      type: UndoRedoType.STYLE,
      oldStyle: [JSON.stringify(oldStyle)],
      newStyle: [JSON.stringify(newStyle)],
    });
  }

  handleGenericElements(canvasElement: CanvasElement) {
    // this.adjustWidthHeight(canvasElement);
    const newNode = CanvasUtils.buildDom(canvasElement);
    this.attachEventListner(newNode, canvasElement);
    this.addItemInProject(canvasElement, newNode);
    this.addToUndoList([canvasElement], [newNode], UndoRedoType.ADD);
  }

  addToUndoList(canvasElements, nodes, type: UndoRedoType) {
    this.undoService.add({
      canvasElements,
      nodes,
      type
    });
  }

  adjustWidthHeight(canvasElement: CanvasElement) {
    if (canvasElement.type === ELEMENT_TYPES.PHOTO) {
      ImageUtils.setInitialWidthAndHeight(this.project.canvasElement, canvasElement);
    }
  }

  onSelectionStart(e: NgxElementSelectorEvent) {
  }

  onSelection(e) {
    e.removed.forEach((t: Element) => t.classList.remove(CSS_CLASSES.SELECTABLE_ITEM_GUID));
    e.selected.forEach((t: Element) => t.classList.add(CSS_CLASSES.SELECTABLE_ITEM_GUID));
  }

  selectoDragStart(e) {
    const classList: DOMTokenList = e.inputEvent.target.classList;
    if (classList.contains(CSS_CLASSES.MOVEABLE_AREA) || classList.contains(CSS_CLASSES.MOVEABLE_CONTROL) ||
      classList.contains(CSS_CLASSES.MOVEABLE_LINE)) {
      e.stop();
    }
  }

  selectoDragEnd(e) {
    console.log(e);
  }

  clearItemSelection() {
    if (this.selectedNodes) {
      for (const node of this.selectedNodes) {
        node.classList.remove(CSS_CLASSES.SELECTABLE_ITEM_GUID);
      }
    }
    this.selectedNodes = [];
    this.selectedCanvasElements = [];

  }

  onSelectionEnd(e) {
    const selected = e.selected;
    selected.forEach(t => t.style.outline = '');
    const children = this.projectNode.children;
    const ce = [];
    const ne = [];
    const newGudingEle = [];

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (selected.includes(child)) {
        const canvasElement = this.project.canvasElement.children[i];

        // If the selected item is only the item or if multiple items getting selected then ignore LOCKED items
        if (selected.length === 1 || !canvasElement.locked) {
          ne.push(child);
          ce.push(canvasElement);
        }
      } else {
        // If element is not selected move them to guiding elments
        newGudingEle.push(child);
      }
    }
    // Update the z-index if only one item is selected
    if (ne.length === 1) {
      this.addZIndex(ne[0], ce[0]);
    }
    this.setInitialGroupRotate(ce[0]);
    this.guidingElements = newGudingEle;
    this.selectedNodes = ne;
    this.selectedCanvasElements = ce;

    console.log(newGudingEle);
    // tslint:disable-next-line: no-unused-expression
    e.isDragStart && this.selectElementRef.startCustomDrag(e.inputEvent);
  }

  setInitialGroupRotate(canvasElement: CanvasElement) {
    this.defaultGroupRotate = canvasElement ?
      CSSUtils.getTransformValue(canvasElement.style[CSS_PROPERTIES.TRANSFORM], 'rotate') : 0;
  }

  onSelectEnd(e) {
  }

  addItemInProject(canvasElement, newNode) {
    this.projectNode.appendChild(newNode);
    this.project.canvasElement.children.push(canvasElement);
  }

  allowDrop(e) {
    e.preventDefault();
  }

  createInitialView() {
    const node = CanvasUtils.buildDom(this.project.canvasElement);
    // We need to iterate throug all the element and attach mouse down listener to all
    // this.attachEventListner(node, this.project, false);
    this.projectNode = node;
    this.canvas.nativeElement.appendChild(node);
    this.undoService.init(this.projectNode, this.project.canvasElement);
  }

  onCanvasClick(e) {
    // Temporary
    if (e.target && e.target.classList.contains('canvas-template')) {
      this.selectedNode = null;
      this.selectedCanvasElement = null;
    }
  }

  attachEventListner(node, canvasElement, enableRotate = true) {
    this.selectElement(node, canvasElement, enableRotate);
    this.addZIndex(node, canvasElement);
  }

  selectElement(node, canvasElement, enableRotate) {
    this.selectedNodes = [node];
    this.selectedCanvasElements = [canvasElement];
    this.guidingElements = Array.from(this.projectNode.children);
  }


  getInitialRotateDeg() {
    const val = this.selectedNode.style.transform;
    return val ? parseInt(val.split('rotate(')[1], 10) : 0;
  }

  addZIndex(node, canvasElement: CanvasElement) {
    // In case if user select same item or click on the same Items multiple times. then ignore the z-index update
    if (canvasElement.locked || canvasElement.style[CSS_PROPERTIES.Z_INDEX] === this.project.currentZindex - 1) {
      return;
    }
    CanvasUtils.applyCss(node, canvasElement, {
      [CSS_PROPERTIES.Z_INDEX]: this.project.currentZindex++
    }, true);
  }

  onItemRemove({ canvasElements, nodes }, selectNextElement = true) {
    const children = this.project.canvasElement.children.filter(t => !canvasElements.includes(t));
    this.project.canvasElement.children = children;

    this.addToUndoList(canvasElements, nodes, UndoRedoType.DELETE);
    nodes.forEach(node => {
      node.remove();
    });

    if (selectNextElement) {
      const childNodes = this.projectNode.children;
      this.selectedCanvasElements = children.length ? [children[children.length - 1]] : [];
      this.selectedNodes = childNodes.length ? [childNodes[childNodes.length - 1]] : [];
    }
  }

  onItemGroup(e) {
    const newCanvasElement = new CanvasElement('div', {}, { position: 'absolute' }, e.items.canvasElements);
    newCanvasElement.type = ELEMENT_TYPES.GROUP;

    CanvasUtils.setGroupNodeLocation(e.items.nodes, newCanvasElement, this.canvas.nativeElement, e.groupedTranform, e.groupedDimention);

    this.onItemRemove(e.items, false);
    this.addNewNode(newCanvasElement);
  }

  onItemUnGroup({ items, groupedTranform, groupedDimention }) {
    const parent: CanvasElement = items.canvasElements[0];
    parent.children.forEach((child: CanvasElement) => {
      child.transform.translateX += parent.transform.translateX;
      child.transform.translateY += parent.transform.translateY;
      child.transform.rotate += parent.transform.rotate;
      child.transform.scaleX += parent.transform.scaleX - 1;
      child.transform.scaleY += parent.transform.scaleY - 1;
      child.style[CSS_PROPERTIES.TRANSFORM] = ElementTranform.toCss(child.transform);
      this.addNewNode(child);
    });
    CanvasUtils.setUnGroupNodeLocation(items.nodes[0], items.canvasElements[0]);

    this.onItemRemove(items, false);
  }

  subscribeEventer() {
    this.eventer.get().pipe(filter((t: EventModal) => this.CANVAS_EVENTS.includes(t.type))).subscribe((event: EventModal) => {
      this.processEventer(event);
    });
  }

  processEventer(event: EventModal) {
    switch (event.type) {
      case EventTypes.CANVAS_PREVIEW:
        this.showPreview = true;
        break;
      case EventTypes.CANVAS_ADD_ITEM:
        this.addNewNode(event.value.item);
        break;
      case EventTypes.CANVAS_DOWNLOAD:
        this.openDownloadPopup.emit(this.projectNode);
        break;

    }
  }
}
