import { Component, Input, OnInit } from '@angular/core';

export class TemplatePreviewModal {
  img: string;
  name: string;
}

@Component({
  selector: 'app-template-preview',
  templateUrl: './template-preview.component.html',
  styleUrls: ['./template-preview.component.scss']
})
export class TemplatePreviewComponent implements OnInit {

  @Input() item: TemplatePreviewModal;

  constructor() { }

  ngOnInit(): void {

  }
}
