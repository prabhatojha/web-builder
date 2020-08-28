import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleSelectComponent } from './component/single-select/single-select.component';
import { MultiSelectComponent } from './component/multi-select/multi-select.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { PopupComponent } from './component/popup/popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchBoxComponent } from './component/search-box/search-box.component';
import { MaterialModule } from 'src/app/material.module';
import { RemovePxPipe } from './pipes/remove-px/remove-px.pipe';

const components = [
  SingleSelectComponent,
  MultiSelectComponent,
  ClickOutsideDirective,
  PopupComponent,
  SearchBoxComponent,
  RemovePxPipe
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [...components],
  exports: [...components, FormsModule,
    ReactiveFormsModule]
})
export class SharedModule { }
