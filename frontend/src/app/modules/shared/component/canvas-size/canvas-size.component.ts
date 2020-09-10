import { Component, OnInit } from '@angular/core';
import { CANVAS_SIZES } from 'src/app/constants/canvas-size.constants';

@Component({
  selector: 'app-canvas-size',
  templateUrl: './canvas-size.component.html',
  styleUrls: ['./canvas-size.component.scss']
})
export class CanvasSizeComponent implements OnInit {

  showCanvasSizeOptions = false;
  canvasSizes = CANVAS_SIZES;

  constructor() { }

  ngOnInit(): void {
  }

  open() {
    this.showCanvasSizeOptions = true;
  }

}
