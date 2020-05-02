import {
  Component, OnInit, Input, HostListener, Output, EventEmitter, OnChanges,
  SimpleChanges, ViewChild, ElementRef
} from '@angular/core';

@Component({
  selector: 'app-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.scss']
})
export class PickerComponent implements OnInit, OnChanges {

  @Input() picker;
  @Output() closePicker = new EventEmitter<any>();

  @ViewChild('itemsRef', { static: true }) itemsRef: ElementRef;

  items = [{
    tag: 'div',
    text: null,
    children: [],
    style: {
      width: '50%',
      height: '100px',
      border: '1px solid grey'
    }
  }];
  constructor() { }

  @HostListener('document:keydown.esc')
  onEsc() {
    this.closePicker.emit();
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.picker && this.picker) {
      this.loadItems();
    }
  }

  loadItems() {
    this.items.forEach(item => {
      const ele = document.createElement(item.tag);
      ele.draggable = true;
      ele.ondragstart = (ev: any) => {
        ev.dataTransfer.setData('text', ev.target.id);
      };
      ele.id = 'myIddd';
      Object.keys(item.style).forEach(key => {
        ele.style[key] = item.style[key];
      });
      this.itemsRef.nativeElement.appendChild(ele);
    });
  }

}
