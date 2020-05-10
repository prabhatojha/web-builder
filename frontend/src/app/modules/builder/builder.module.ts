import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PickersComponent } from './pickers/pickers.component';
import { BuilderComponent } from './builder/builder.component';
import { PickerComponent } from './picker/picker.component';
import { CanvasComponent } from './canvas/canvas.component';
import { BuilderRoutingModule } from '../builder-routing.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [PickersComponent, BuilderComponent, PickerComponent, CanvasComponent],
  imports: [
    CommonModule,
    MatIconModule,
    BuilderRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuilderModule { }
