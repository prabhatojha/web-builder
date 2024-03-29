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
import { LayeringActions, LayeringService } from '../../shared/services/layering/layering.service';
import { AppAnimations } from 'src/style/_angular-animations';
import { DEFAULT_PROJECT_SIZE } from './canvas.config';
import { ProjectsService } from '../../shared/services/projects/projects.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [AppAnimations.InOut, AppAnimations.SlideDown, AppAnimations.ScaleInOut]
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
  projectDimention = DEFAULT_PROJECT_SIZE;


  // Project node is the first canvas element from CANVAS_PROJECT
  projectNode: HTMLElement;
  toolbarOptions = [];



  showPreview = false;

  defaultGroupRotate = 0;

  guidingElements = []; // Is used to set elementGuidelines to ngx-moveable

  constructor(private eventer: EventerService, private undoService: UndoService, private layeringService: LayeringService,
    private projectService: ProjectsService) {
  }

  ngOnInit(): void {
    this.onWindowResize();
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
      const newElement: CanvasElement = CommonUtils.cloneDeep(element);
      newElement.locked = false;
      CanvasUtils.setDuplicateNodeLocation(newElement);
      this.addNewNode(newElement);
    });
  }

  addNewNode(canvasElement: CanvasElement) {
    this.projectService.submitSaveRequest();
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

    this.setInitialGroupRotate(ce[0]);
    this.guidingElements = newGudingEle;
    this.selectedNodes = ne;
    this.selectedCanvasElements = ce;

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
    this.projectService.submitSaveRequest();
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

  onLayeringChange(action: LayeringActions) {
    this.layeringService.doAction(this.projectNode.children, this.project.canvasElement.children,
      this.selectedNodes[0], action);
  }

  subscribeEventer() {
    this.eventer.get().subscribe((event: EventModal) => {
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
      case EventTypes.UPDATE_CANVAS_SIZE:
        this.updateCanvasSize(event.value);
        break;
    }
  }

  getProjectCanvasElement() {
    return this.project.canvasElement as CanvasElement;
  }

  updateCanvasSize(e) {
    const projectElement = this.getProjectCanvasElement();
    projectElement.style[CSS_PROPERTIES.WIDTH] = e.w;
    projectElement.style[CSS_PROPERTIES.HEIGHT] = e.h;
    this.onWindowResize();
    this.projectNode.style[CSS_PROPERTIES.WIDTH] = projectElement.style[CSS_PROPERTIES.WIDTH];
    this.projectNode.style[CSS_PROPERTIES.HEIGHT] = projectElement.style[CSS_PROPERTIES.HEIGHT];
  }

  onWindowResize() {
    CanvasUtils.adjustCanvasSize(this.getProjectCanvasElement());
    this.setProjectDimention();
  }

  setProjectDimention() {
    const projectElement = this.getProjectCanvasElement();
    this.projectDimention = {
      w: parseFloat(projectElement.style[CSS_PROPERTIES.WIDTH]),
      h: parseFloat(projectElement.style[CSS_PROPERTIES.HEIGHT])
    };

    this.projectService.submitSaveRequest();
  }
}
