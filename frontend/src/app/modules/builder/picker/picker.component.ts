import {
  Component, OnInit, Input, HostListener, Output, EventEmitter, OnChanges,
  SimpleChanges, ViewChild, ElementRef
} from '@angular/core';
import { CONST_VAR } from 'src/app/constants/contants';
import { PICKERS } from './picker.mock';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ width: 0, opacity: 0 }),
        animate('1s ease-out', style({ width: 310, opacity: 1 }))
      ]),
      transition(':leave', [
        style({ width: 310, opacity: 1 }),
        animate('1s ease-in',
          style({ width: 0, opacity: 0 }))
      ])
    ])
  ]
})
export class PickerComponent implements OnChanges {

  @Input() picker;
  @Input() showPicker = false;
  @Output() showPickerChange = new EventEmitter();
  @Output() closePicker = new EventEmitter<any>();

  @ViewChild('itemsRef', { static: true }) itemsRef: ElementRef;

  items = [];

  constructor() { }

  @HostListener('document:keydown.esc')
  onEsc() {
    this.closePicker.emit();
  }

  /**
   * will make api call to backend
   */
  loadItems() {
    this.items = PICKERS[this.picker.id];
    this.visuliseItems();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.picker && this.picker) {
      this.itemsRef.nativeElement.innerHTML = '';
      this.loadItems();
    }
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
