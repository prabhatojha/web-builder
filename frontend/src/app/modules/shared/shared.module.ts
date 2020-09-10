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
import { CanvasSizeComponent } from './component/canvas-size/canvas-size.component';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

const components = [
  SingleSelectComponent,
  MultiSelectComponent,
  ClickOutsideDirective,
  PopupComponent,
  SearchBoxComponent,
  RemovePxPipe,
  CanvasSizeComponent
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FontAwesomeModule
  ],
  declarations: [...components],
  exports: [...components, FormsModule,
    ReactiveFormsModule, FontAwesomeModule]
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far, fab);
  }
}
