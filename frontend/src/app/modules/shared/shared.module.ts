import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleSelectComponent } from './component/single-select/single-select.component';
import { MultiSelectComponent } from './component/multi-select/multi-select.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { PopupComponent } from './component/popup/popup.component';
import { SliderComponent } from './component/slider/slider.component';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const components = [
  SingleSelectComponent,
  MultiSelectComponent,
  ClickOutsideDirective,
  PopupComponent,
  SliderComponent
];
@NgModule({
  imports: [
    CommonModule,
    MatSliderModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [...components],
  exports: [...components]
})
export class SharedModule { }
