import { NgModule } from '@angular/core';
import { NgxElementSelectorComponent } from './ngx-element-selector.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [NgxElementSelectorComponent],
  imports: [
    CommonModule
  ],
  exports: [NgxElementSelectorComponent]
})
export class NgxElementSelectorModule { }
