import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CSS_PROPERTIES } from 'src/app/constants/css-constants';
import { LayeringActions } from 'src/app/modules/shared/services/layering/layering.service';
import { AppAnimations } from 'src/style/_angular-animations';

@Component({
  selector: 'app-element-layering',
  templateUrl: './element-layering.component.html',
  styleUrls: ['./element-layering.component.scss'],
  animations: [AppAnimations.SlideDown]
})
export class ElementLayeringComponent implements OnInit {

  @Input() selectedNode: HTMLElement;

  @Output() layeringChange = new EventEmitter<LayeringActions>();

  disabled = false;
  isVisible = false;
  CSS_PROPERTIES = CSS_PROPERTIES;

  availableOtions = [
    {
      icon: 'keyboard_arrow_left',
      type: LayeringActions.BRING_FORWARD,
      toolTip: 'Move up',
      disabled: 'nextSibling'
    },
    {
      icon: 'keyboard_arrow_right',
      type: LayeringActions.SEND_BACKWARD,
      toolTip: 'Move down',
      disabled: 'previousSibling'
    },
    {
      icon: 'first_page',
      type: LayeringActions.MOVE_TO_FRONT,
      toolTip: 'Move to top',
      disabled: 'nextSibling'
    },
    {
      icon: 'last_page',
      type: LayeringActions.MOVE_TO_LAST,
      toolTip: 'Move to bottom',
      disabled: 'previousSibling'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    this.isVisible = !this.isVisible;
  }

  sendEvent(item) {
    this.layeringChange.emit(item.type);
  }

}
