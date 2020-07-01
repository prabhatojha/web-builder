import {
  Component, OnInit, Input, HostListener, Output, EventEmitter, OnChanges,
  SimpleChanges, ViewChild, ElementRef
} from '@angular/core';
import { CONST_VAR } from 'src/app/constants/contants';
import { PICKERS } from './picker.mock';
import { LEFT_MENU_CONST } from './picker.config';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.scss']
})
export class PickerComponent implements OnChanges {

  @Input() picker;
  @Input() showPicker = false;
  @Output() showPickerChange = new EventEmitter();
  @Output() closePicker = new EventEmitter<any>();

  @ViewChild('itemsRef', { static: true }) itemsRef: ElementRef;

  items = [];
  isLoading = true;
  LEFT_MENU_CONST = LEFT_MENU_CONST;

  constructor() { }

  onClose() {
    this.showPickerChange.emit(false);
  }

  /**
   * will make api call to backend
   */
  loadItems() {
    this.items = [];
    setTimeout(() => {
      this.items = PICKERS[this.picker.id];
      this.isLoading = false;
    }, 100);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.picker && this.picker) {
      this.isLoading = true;
      this.loadItems();
    }
  }

  dragStart(ev, item) {
    const bound = ev.target.getBoundingClientRect();

    ev.dataTransfer.setData(CONST_VAR.PICKER_ITEM,
      JSON.stringify({
        left: ev.clientX - bound.left,
        top: ev.clientY - bound.top,
        item
      }));
  }

  visuliseItems() {
    this.items.forEach(item => {
      const ele = document.createElement(item.tag);
      ele.draggable = true;
      ele.ondragstart = (ev: any) => {
        const bound = ev.target.getBoundingClientRect();

        ev.dataTransfer.setData(CONST_VAR.PICKER_ITEM,
          JSON.stringify({
            id: ev.target.id,
            left: ev.clientX - bound.left,
            top: ev.clientY - bound.top
          }));

      };
      ele.id = 'myIddd';
      ele.innerText = item.text;
      Object.keys(item.style).forEach(key => {
        ele.style[key] = item.style[key];
      });
      this.itemsRef.nativeElement.appendChild(ele);
    });
  }

}
