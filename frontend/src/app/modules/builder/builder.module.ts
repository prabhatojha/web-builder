import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PickersComponent } from './pickers/pickers.component';
import { BuilderComponent } from './builder/builder.component';
import { PickerComponent } from './picker/picker.component';
import { CanvasComponent } from './canvas/canvas.component';
import { BuilderRoutingModule } from '../builder-routing.module';

@NgModule({
  declarations: [PickersComponent, BuilderComponent, PickerComponent, CanvasComponent],
  imports: [
    CommonModule,
    BuilderRoutingModule
  ]
})
export class BuilderModule { }
