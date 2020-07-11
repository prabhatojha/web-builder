import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { EventerService, EventTypes, EventModal } from 'src/app/modules/shared/services/eventer.service';
import { filter } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import ResizeObserver from 'resize-observer-polyfill';
import { CanvasElement } from 'src/app/models/canvas.element.model';
import { CanvasUtils } from 'src/app/utils/canvas.utils';
import { ELEMENT_TYPES } from 'src/app/constants/contants';

@Component({
  selector: 'app-select-element',
  templateUrl: './select-element.component.html',
  styleUrls: ['./select-element.component.scss', './select-element.resize.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelectElementComponent implements OnChanges {

  @Input() selectedNode: any;
  @Input() selectedCanvasElement: CanvasElement;

  resizeObserver = new ResizeObserver((entries: any) => {
    console.log('Resize Observer');
    const rect = entries[0].contentRect;
    this.styles = Object.assign(this.styles, { height: rect.height + 'px' });
    this.cd.detectChanges();
  });

  mutationObserver = new MutationObserver((entries: any) => {
    console.log('Mutation Observer');
    const target = entries[0] && entries[0].target;
    if (target) {
      this.styles = Object.assign(this.styles, {
        top: target.offsetTop + 'px', left: target.offsetLeft + 'px', width: target.offsetWidth + 'px',
        height: target.offsetHeight + 'px'
      });
      this.cd.detectChanges();
    }
  });

  styles: any = {};
  subsribedListeners = {
    MOUSE_DOWN: 'mousedown'
  };

  previousSelectedNode: any;

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
      this.mutationObserver.disconnect();
    }

    this.previousSelectedNode = this.selectedNode;
  }

  setInitialSize() {
    console.log('Set Initial Size');
    const { top, left, width } = this.selectedNode.style;
    this.styles = { top, left, width, height: this.selectedNode.offsetHeight + 'px' };
    if (this.selectedCanvasElement.type === ELEMENT_TYPES.TEXT) {
      // this.resizeObserver.observe(this.selectedNode);
    }

    // this.mutationObserver.observe(this.selectedNode, { attributes: true });
  }

  resizing(e) {
    console.log('Resizing');
    CanvasUtils.applyCss(this.selectedNode, this.selectedCanvasElement, this.getResizeStyle(e));
  }

  getResizeStyle(e) {
    const { left, top } = e.position;
    const { width, height } = e.size;
    return { top, left, width, height };
  }
}
