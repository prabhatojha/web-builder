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
import { ColorSketchModule } from 'ngx-color/sketch';
import { ColorSwatchesModule } from 'ngx-color/swatches'; // <color-swatches></color-swatches>
import { ColorPhotoshopModule } from 'ngx-color/photoshop'; // <color-photoshop></color-photoshop>
import { ColorBlockModule } from 'ngx-color/block'; // <color-block></color-block>
import { ColorChromeModule } from 'ngx-color/chrome';
import { CanvasPreviewComponent } from './canvas/canvas-preview/canvas-preview.component';
import { CanvasScaleComponent } from './canvas/canvas-scale/canvas-scale.component'; // <color-chrome></color-chrome>
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { TextAlignmentComponent } from './toolbar/text-alignment/text-alignment.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';


@NgModule({
  declarations: [PickersComponent, BuilderComponent, PickerComponent, CanvasComponent, ToolbarComponent,
    ToolbarPanelComponent, ColorPickerComponent, CanvasPreviewComponent, CanvasScaleComponent, TextAlignmentComponent],
  imports: [
    CommonModule,
    MatIconModule,
    ColorSketchModule,
    BuilderRoutingModule,
    SharedModule,
    ColorSwatchesModule,
    ColorPhotoshopModule,
    ColorBlockModule,
    ColorChromeModule,
    MatTooltipModule,
    MatButtonModule,
    MatButtonToggleModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuilderModule { }
