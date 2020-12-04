import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { TemplatePreviewComponent } from './template-preview/template-preview.component';

@NgModule({
  declarations: [DashboardComponent, ProjectListComponent, TemplatePreviewComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
