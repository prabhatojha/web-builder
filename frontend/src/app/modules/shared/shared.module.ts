import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleSelectComponent } from './component/single-select/single-select.component';
import { MultiSelectComponent } from './component/multi-select/multi-select.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { PopupComponent } from './component/popup/popup.component';

const components = [
  SingleSelectComponent,
  MultiSelectComponent,
  ClickOutsideDirective,
  PopupComponent
];
@NgModule({
  declarations: [...components],
  imports: [
    CommonModule
  ],
  exports: [...components]
})
export class SharedModule { }
