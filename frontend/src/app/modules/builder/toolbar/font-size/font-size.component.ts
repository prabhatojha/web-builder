import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-font-size',
  templateUrl: './font-size.component.html',
  styleUrls: ['./font-size.component.scss']
})
export class FontSizeComponent implements OnInit {

  @Input() selectedValue: number;
  @Input() disabled: boolean;

  @Output() valueChange = new EventEmitter();

  AVAILABLE_FONT_SIZE = [];
  showOptions = false;

  constructor() {
    for (let i = 5; i < 150; i++) {
      this.AVAILABLE_FONT_SIZE.push({ label: i, value: i });
    }
  }

  ngOnInit(): void {
  }

  onInputChange() {
    this.onValueChange(this.selectedValue);
  }

  onValueChange(value) {
    this.valueChange.emit(value);
  }

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

}
