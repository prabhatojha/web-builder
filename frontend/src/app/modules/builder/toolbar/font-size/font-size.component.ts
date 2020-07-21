import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-font-size',
  templateUrl: './font-size.component.html',
  styleUrls: ['./font-size.component.scss']
})
export class FontSizeComponent implements OnChanges {

  @Input() selectedValue: string;
  @Input() disabled: boolean;

  @Output() valueChange = new EventEmitter();

  AVAILABLE_FONT_SIZE = [];
  showOptions = false;
  value: number;

  constructor() {
    for (let i = 5; i < 150; i++) {
      this.AVAILABLE_FONT_SIZE.push({ label: i, value: i });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.value = parseInt(this.selectedValue, 10);
  }

  onInputChange() {
    this.onValueChange(this.value);
  }

  onValueChange(value) {
    this.valueChange.emit(value);
  }

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

}
