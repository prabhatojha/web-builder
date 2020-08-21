import { Component, OnInit, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import Pickr from '@simonwep/pickr';
import { CSS_PROPERTY_VALUES } from 'src/app/constants/css-constants';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit, AfterViewInit {

  @Input() externalSourseElement: HTMLLIElement;
  @Input() heading: string;
  showDropdown = false;
  selectedColor = '';
  CSS_PROPERTY_VALUES = CSS_PROPERTY_VALUES;

  customColors = [];
  standeardColors = [
    '#000000', '#323232', '#646464', '#7d7d7d', '#afafaf', '#e1e1e1', '#ffffff',
    '#820000', '#b40000', '#e60000', '#ff0000', '#ff3232', '#ff6464', '#ff7d7d',
    '#823400', '#b44800', '#e65c00', '#ff6600', '#ff8532', '#ffa364', '#ffb27d',
    '#828200', '#b4b400', '#e6e600', '#ffff00', '#ffff32', '#ffff64', '#ffff7d',
    '#003300', '#008000', '#00cc00', '#00e600', '#4dff4d', '#80ff80', '#b3ffb3',
    '#001a4d', '#003cb3', '#0000ff', '#0055ff', '#4d88ff', '#80b3ff', '#b3d1ff',
    '#003333', '#006666', '#00cccc', '#00ffff', '#33ffff', '#80ffff', '#b3ffff',
    '#4d004d', '#660066', '#ac39ac', '#bf40bf', '#cc66cc', '#d98cd9', '#df9fdf',
    '#660029', '#b30047', '#e6005c', '#ff0066', '#ff3385', '#ff66a3', '#ff99c2'
  ];

  showColorPicker = false;
  selectedOption: any = {};
  unsavedColor: any;

  @Output() colorHover = new EventEmitter();
  @Output() colorSelect = new EventEmitter();
  @ViewChild('toolbarNewColorPicker', { static: true }) toolbarNewColorPicker: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  openColorPicker(opt) {
    this.selectedOption = opt;
    this.showColorPicker = true;
  }

  onPick(e) {
    e.stopPropagation();
    this.showColorPicker = false;
    const rgb = this.unsavedColor.rgb;
    this.customColors.push(`rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`);
  }

  open() {
    setTimeout(() => {
      this.showDropdown = true;
    });
  }

  onHover(color) {
  }

  onClick(color) {
    this.colorSelect.emit(color);
  }

  close() {
    this.showDropdown = false;
    this.showColorPicker = false;
  }

  toggleOptions() {
    this.showDropdown = !this.showDropdown;
    this.showColorPicker = false;
  }
}
