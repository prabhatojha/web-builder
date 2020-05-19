import { Component, OnInit, Input } from '@angular/core';
import { AVA_TOOLBAR_OPTIONS } from '../../../constants/canvas-contants';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() options = AVA_TOOLBAR_OPTIONS.slice(0, 3);

  AVA_TOOLBAR_OPTIONS = AVA_TOOLBAR_OPTIONS.slice(0, 3);

  constructor() { }

  ngOnInit(): void {
  }

}
