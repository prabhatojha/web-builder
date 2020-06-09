import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleSelectComponent } from './component/single-select/single-select.component';
import { MultiSelectComponent } from './component/multi-select/multi-select.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { PopupComponent } from './component/popup/popup.component';
import { SliderComponent } from './component/slider/slider.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchBoxComponent } from './component/search-box/search-box.component';
import { MaterialModule } from 'src/app/material.module';

const components = [
  SingleSelectComponent,
  MultiSelectComponent,
  ClickOutsideDirective,
  PopupComponent,
  SliderComponent,
  SearchBoxComponent
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [...components],
  exports: [...components]
})
export class SharedModule { }
