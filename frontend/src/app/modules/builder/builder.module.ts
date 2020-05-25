import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PickersComponent } from './pickers/pickers.component';
import { BuilderComponent } from './builder/builder.component';
import { PickerComponent } from './picker/picker.component';
import { CanvasComponent } from './canvas/canvas.component';
import { BuilderRoutingModule } from '../builder-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SharedModule } from '../shared/shared.module';
import { ToolbarPanelComponent } from './toolbar/toolbar-panel/toolbar-panel.component';
import { ColorPickerComponent } from './toolbar/color-picker/color-picker.component';

@NgModule({
  declarations: [PickersComponent, BuilderComponent, PickerComponent, CanvasComponent, ToolbarComponent, ToolbarPanelComponent, ColorPickerComponent],
  imports: [
    CommonModule,
    MatIconModule,
    BuilderRoutingModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuilderModule { }
