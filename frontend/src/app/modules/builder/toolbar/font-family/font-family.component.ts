import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FontFamilyService } from 'src/app/modules/shared/services/font/font-family.service';

@Component({
  selector: 'app-font-family',
  templateUrl: './font-family.component.html',
  styleUrls: ['./font-family.component.scss']
})
export class FontFamilyComponent implements OnInit {

  @Input() selectedFont;
  @Input() disabled: boolean;

  @Output() fontHover = new EventEmitter();
  @Output() fontSelect = new EventEmitter();
  @Output() revertFontSelect = new EventEmitter();

  options = [];
  constructor(private fontService: FontFamilyService) { }

  ngOnInit(): void {
    this.options = this.fontService.getFonts();
  }

  onSelect($event) {
    this.fontHover.emit($event);
  }

  onHover($event) {
    this.fontHover.emit($event);
  }
}
