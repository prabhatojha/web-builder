import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES } from 'src/app/constants/app-routes';
import { CANVAS_SIZES, CUSTOM_CANVAS_SIZE_ID, PROJECT_TYPE } from 'src/app/constants/canvas-size.constants';
import { APP_REGEX } from 'src/app/constants/regex.constants';
import { AppAnimations } from 'src/style/_angular-animations';
import { EventerService, EventTypes } from '../../services/eventer.service';

@Component({
  selector: 'app-canvas-size',
  templateUrl: './canvas-size.component.html',
  styleUrls: ['./canvas-size.component.scss'],
  animations: [AppAnimations.SlideDown]
})
export class CanvasSizeComponent implements OnInit {

  showCanvasSizeOptions = false;
  canvasSizes = CANVAS_SIZES;
  PROJECT_TYPE = PROJECT_TYPE;
  APP_ROUTES = APP_ROUTES;

  width = '';
  height = '';

  constructor(private router: Router, private eventer: EventerService) { }

  ngOnInit(): void {
  }

  open() {
    this.showCanvasSizeOptions = true;
  }

  onClick(e, item) {
    e && e.preventDefault();
    this.sendEvent(item.dimention);
  }

  sendEvent(dimension) {
    this.eventer.send({ type: EventTypes.UPDATE_CANVAS_SIZE, value: dimension });
    this.showCanvasSizeOptions = false;
  }

  onCustomSize() {
    if (APP_REGEX.ONLY_NUMBER.test(this.width) && APP_REGEX.ONLY_NUMBER.test(this.height)) {
      const width = parseInt(this.width, 10);
      const height = parseInt(this.height, 10);
      if (width > 0 && height > 0 && width < 2000 && height < 2000) {
        this.sendEvent({ w: width, h: height });
      }
    }
  }

}
