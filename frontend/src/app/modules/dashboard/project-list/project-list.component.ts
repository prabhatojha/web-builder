import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TemplatePreviewModal } from '../template-preview/template-preview.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit, OnDestroy {

  @Input() items: TemplatePreviewModal[];
  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }
}
