import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CSS_PROPERTIES } from 'src/app/constants/css-constants';
import { LayeringActions } from 'src/app/modules/shared/services/layering/layering.service';

@Component({
  selector: 'app-element-layering',
  templateUrl: './element-layering.component.html',
  styleUrls: ['./element-layering.component.scss']
})
export class ElementLayeringComponent implements OnInit {

  @Input() selectedNode: HTMLElement;

  @Output() layeringChange = new EventEmitter<LayeringActions>();

  disabled = false;
  isVisible = false;
  CSS_PROPERTIES = CSS_PROPERTIES;

  availableOtions = [
    {
      icon: 'first_page', cssValue: 'left', type: LayeringActions.MOVE_TO_LAST, toolTip: 'Move to last',
      disabled: 'previousSibling'
    },
    {
      icon: 'keyboard_arrow_left', cssValue: 'center', type: LayeringActions.SEND_BACKWARD, toolTip: 'Send one step backward',
      disabled: 'previousSibling'
    },
    {
      icon: 'keyboard_arrow_right', cssValue: 'justify', type: LayeringActions.BRING_FORWARD, toolTip: 'Bring one step forward',
      disabled: 'nextSibling'
    },
    {
      icon: 'last_page', cssValue: 'right', type: LayeringActions.MOVE_TO_FRONT, toolTip: 'Bring to front',
      disabled: 'nextSibling'
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
