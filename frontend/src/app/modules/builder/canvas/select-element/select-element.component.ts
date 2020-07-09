import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { EventerService, EventTypes, EventModal } from 'src/app/modules/shared/services/eventer.service';
import { filter } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import ResizeObserver from 'resize-observer-polyfill';

@Component({
  selector: 'app-select-element',
  templateUrl: './select-element.component.html',
  styleUrls: ['./select-element.component.scss']
})
export class SelectElementComponent implements OnChanges {

  @Input() selectedNode: any;

  resizeObserver = new ResizeObserver((entries: any) => {
    const rect = entries[0].contentRect;
    this.styles = Object.assign(this.styles, { height: rect.height + 'px' });
    console.log('EO', this.styles);
    this.cd.detectChanges();
  });

  mutationObserver = new MutationObserver((entries: any) => {
    const target = entries[0] && entries[0].target;
    if (target) {
      console.log(target);
      this.styles = Object.assign(this.styles, { top: target.offsetTop + 'px', left: target.offsetLeft + 'px' });
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
    const { top, left, width } = this.selectedNode.style;
    this.styles = { top, left, width };
    this.resizeObserver.observe(this.selectedNode);
    this.mutationObserver.observe(this.selectedNode, { attributes: true });
  }
}
