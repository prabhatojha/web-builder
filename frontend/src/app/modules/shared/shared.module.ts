import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleSelectComponent } from './component/single-select/single-select.component';
import { MultiSelectComponent } from './component/multi-select/multi-select.component';

const components = [
  SingleSelectComponent,
  MultiSelectComponent
];
@NgModule({
  declarations: [...components],
  imports: [
    CommonModule
  ],
  exports: [...components]
})
export class SharedModule { }
