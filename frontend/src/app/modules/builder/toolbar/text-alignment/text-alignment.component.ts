import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-text-alignment',
  templateUrl: './text-alignment.component.html',
  styleUrls: ['./text-alignment.component.scss']
})
export class TextAlignmentComponent implements OnInit {

  @Input() disabled: boolean;
  @Output() selectedValues;
  @Output() selction = new EventEmitter();

  isVisible = false;
  availableOtions = [
    { icon: 'format_align_left', cssValue: 'left' },
    { icon: 'format_align_center', cssValue: 'center' },
    { icon: 'format_align_justify', cssValue: 'justify' },
    { icon: 'format_align_right', cssValue: 'right' }
  ];
  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    this.isVisible = !this.isVisible;
  }
}
