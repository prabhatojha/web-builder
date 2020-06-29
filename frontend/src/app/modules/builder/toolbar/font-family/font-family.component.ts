import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FontFamilyService } from 'src/app/modules/shared/services/font/font-family.service';

@Component({
  selector: 'app-font-family',
  templateUrl: './font-family.component.html',
  styleUrls: ['./font-family.component.scss']
})
export class FontFamilyComponent implements OnInit {

  @Input() selectedFont: string;
  @Input() disabled: boolean;

  @Output() fontHover = new EventEmitter();
  @Output() fontSelect = new EventEmitter();
  @Output() revertFontSelect = new EventEmitter();
  isVisible = false;

  options = [];
  filteredOptions = [];
  constructor(private fontService: FontFamilyService) { }

  ngOnInit(): void {
    this.options = this.fontService.getFonts();
  }

  onSelect($event) {
    this.fontSelect.emit($event);
  }

  onHover($event) {
    this.fontHover.emit($event);
  }

  onCloseWithoutSelect() {
    this.revertFontSelect.emit();
  }

  toggleOptions() {
    this.isVisible = !this.isVisible;
    if (this.isVisible) {
      this.filteredOptions = this.options;
    }
  }

  filterResult(query) {
    console.log('Query', query);
    this.filteredOptions = this.options.filter(t => t.value.toLowerCase().includes(query));
  }
}
