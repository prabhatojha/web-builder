import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AVA_TOOLBAR_OPTIONS, FilterConfig } from './toolbar.config';
import { FILTER_TYPES } from '../../../constants/contants';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnChanges {

  @Input() options = [];

  filterConfig = [];
  FILTER_TYPES = FILTER_TYPES;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.options);
    this.filterConfig = FilterConfig.filter(conf => this.options.includes(conf.id));
    console.log(this.filterConfig);
  }

  ngOnInit(): void {
    console.log(this.options);
  }

  onItemSelect(option, e) {
    console.log(option, e);
  }

}
