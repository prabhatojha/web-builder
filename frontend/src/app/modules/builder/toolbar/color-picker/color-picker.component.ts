import { Component, OnInit, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import Pickr from '@simonwep/pickr';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit, AfterViewInit {

  showDropdown = false;
  selectedColor = '';
  options = [{
    label: 'My Colors',
    id: 'myColor',
    customColors: [],
    colors: []
  },
  {
    label: 'Standard Colors',
    id: 'myColor',
    customColors: [],
    colors: [
      '#000000', '#191919', '#323232', '#4b4b4b', '#646464', '#7d7d7d', '#969696', '#afafaf', '#c8c8c8', '#e1e1e1', '#ffffff',
      '#820000', '#9b0000', '#b40000', '#cd0000', '#e60000', '#ff0000', '#ff1919', '#ff3232', '#ff4b4b', '#ff6464', '#ff7d7d',
      '#823400', '#9b3e00', '#b44800', '#cd5200', '#e65c00', '#ff6600', '#ff7519', '#ff8532', '#ff944b', '#ffa364', '#ffb27d',
      '#828200', '#9b9b00', '#b4b400', '#cdcd00', '#e6e600', '#ffff00', '#ffff19', '#ffff32', '#ffff4b', '#ffff64', '#ffff7d',
      '#003300', '#004d00', '#008000', '#00b300', '#00cc00', '#00e600', '#1aff1a', '#4dff4d', '#66ff66', '#80ff80', '#b3ffb3',
      '#001a4d', '#002b80', '#003cb3', '#004de6', '#0000ff', '#0055ff', '#3377ff', '#4d88ff', '#6699ff', '#80b3ff', '#b3d1ff',
      '#003333', '#004d4d', '#006666', '#009999', '#00cccc', '#00ffff', '#1affff', '#33ffff', '#4dffff', '#80ffff', '#b3ffff',
      '#4d004d', '#602060', '#660066', '#993399', '#ac39ac', '#bf40bf', '#c653c6', '#cc66cc', '#d279d2', '#d98cd9', '#df9fdf',
      '#660029', '#800033', '#b30047', '#cc0052', '#e6005c', '#ff0066', '#ff1a75', '#ff3385', '#ff4d94', '#ff66a3', '#ff99c2'
    ]
  }];

  showColorPicker = false;
  selectedOption: any = {};
  unsavedColor: any;

  @Output() colorHover = new EventEmitter();
  @Output() colorSelect = new EventEmitter();
  @ViewChild('toolbarNewColorPicker', { static: true }) toolbarNewColorPicker: ElementRef;

  constructor() { }

  ngOnInit(): void {
    // this.createPicker();
  }

  ngAfterViewInit() {
    // this.createPicker();
  }

  openColorPicker(opt) {
    this.selectedOption = opt;
    this.showColorPicker = true;
  }

  onPick(e) {
    e.stopPropagation();
    this.showColorPicker = false;
    if (this.unsavedColor && this.selectedOption) {
      this.selectedOption.customColors.push(this.unsavedColor.hex);
    }
  }

  open() {
    this.showDropdown = true;
  }

  onHover(color) {
    // this.colorHover.emit(color);
  }

  onClick(color) {
    this.colorSelect.emit(color);
    // this.close();
  }

  close() {
    this.showDropdown = false;
    this.showColorPicker = false;
  }
}
