import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-canvas-scale',
  templateUrl: './canvas-scale.component.html',
  styleUrls: ['./canvas-scale.component.scss']
})
export class CanvasScaleComponent implements OnChanges {

  @Input() node;
  selectedScale = 100;
  scaleOptions: {
    75: .75,
    100: 1,
    125: 1.25,
    150: 1.5,
    200: 2,
    300: 3
  };

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.setIntialScale();
  }

  setIntialScale() {
    console.log(this.node.ko);
  }

  zoomIn() {
    console.log(this.node);
  }

  changeScale(opt) {
    this.node.style.cssText = 'transition: transform ease .3s;' +
      `transform: scale(${this.scaleOptions[opt]});`;
  }

  zoomOut() {
    this.node.style.transform = 'scale(1)';
  }
}
