import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleSelectComponent } from './component/single-select/single-select.component';
import { MultiSelectComponent } from './component/multi-select/multi-select.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';

const components = [
  SingleSelectComponent,
  MultiSelectComponent,
  ClickOutsideDirective
];
@NgModule({
  declarations: [...components],
  imports: [
    CommonModule
  ],
  exports: [...components]
})
export class SharedModule { }
