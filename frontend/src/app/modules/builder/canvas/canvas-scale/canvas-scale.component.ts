import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-canvas-scale',
  templateUrl: './canvas-scale.component.html',
  styleUrls: ['./canvas-scale.component.scss']
})
export class CanvasScaleComponent implements OnChanges {

  @Input() node;
  selectedScaleIndex = 100;
  scaleOptions = [
    { label: 50, value: .5 },
    { label: 75, value: .75 },
    { label: 100, value: 1 },
    { label: 125, value: 1.25 },
    { label: 150, value: 1.5 },
    { label: 200, value: 2 },
    { label: 250, value: 2.5 },
    { label: 300, value: 3 }
  ];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.selectedScaleIndex = 2;
  }

  setIntialScale() {
    // var element = document.querySelector('...');
    // var scaleX = element.getBoundingClientRect().width / element.offsetWidth;
    // console.log(this.node.ko);
  }

  zoomIn() {
    if (this.selectedScaleIndex === this.scaleOptions.length - 1) {
      return;
    }
    this.selectedScaleIndex++;
    this.changeScale();
  }

  changeScale() {
    const opt = this.scaleOptions[this.selectedScaleIndex];
    this.node.style.cssText = 'transition: transform ease .3s;' +
      `transform: scale(${opt.value});`;
  }

  zoomOut() {
    if (this.selectedScaleIndex === 0) {
      return;
    }
    this.selectedScaleIndex--;
    this.changeScale();
  }
}
