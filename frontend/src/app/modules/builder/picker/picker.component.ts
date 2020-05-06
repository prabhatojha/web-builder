import {
  Component, OnInit, Input, HostListener, Output, EventEmitter, OnChanges,
  SimpleChanges, ViewChild, ElementRef
} from '@angular/core';
import { CONST_VAR } from 'src/app/constants/contants';

@Component({
  selector: 'app-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.scss']
})
export class PickerComponent implements OnInit, OnChanges {

  @Input() picker;
  @Output() closePicker = new EventEmitter<any>();

  @ViewChild('itemsRef', { static: true }) itemsRef: ElementRef;

  items = [];
  constructor() { }

  @HostListener('document:keydown.esc')
  onEsc() {
    this.closePicker.emit();
  }

  ngOnInit(): void {
    this.loadItems();
  }

  /**
   * will make api call to backend
   */
  loadItems() {
    this.items = [{
      tag: 'div',
      text: null,
      children: [],
      style: {
        width: '100px',
        height: '100px',
        border: '1px solid grey',
        position: 'absolute'
      }
    }];

    this.visuliseItems();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.picker && this.picker) {
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
      Object.keys(item.style).forEach(key => {
        ele.style[key] = item.style[key];
      });
      this.itemsRef.nativeElement.appendChild(ele);
    });
  }

}
