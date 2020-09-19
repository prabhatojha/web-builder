import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PickersComponent } from './pickers/pickers.component';
import { BuilderComponent } from './builder/builder.component';
import { PickerComponent } from './picker/picker.component';
import { CanvasComponent } from './canvas/canvas.component';
import { BuilderRoutingModule } from '../builder-routing.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SharedModule } from '../shared/shared.module';
import { ToolbarPanelComponent } from './toolbar/toolbar-panel/toolbar-panel.component';
import { ColorPickerComponent } from './toolbar/color-picker/color-picker.component';
import { ColorChromeModule } from 'ngx-color/chrome';
import { CanvasPreviewComponent } from './canvas/canvas-preview/canvas-preview.component';
import { CanvasScaleComponent } from './canvas/canvas-scale/canvas-scale.component'; // <color-chrome></color-chrome>
import { TextAlignmentComponent } from './toolbar/text-alignment/text-alignment.component';
import { ImagePickerComponent } from './picker/image-picker/image-picker.component';
import { TextPickerComponent } from './picker/text-picker/text-picker.component';
import { MaterialModule } from 'src/app/material.module';
import { FontFamilyComponent } from './toolbar/font-family/font-family.component';
import { VectorPickerComponent } from './picker/vector-picker/vector-picker.component';
import { FontSizeComponent } from './toolbar/font-size/font-size.component';
import { SelectElementComponent } from './canvas/select-element/select-element.component';
import { DragElementComponent } from './canvas/drag-element/drag-element.component';
import { NgxMoveableModule } from 'ngx-moveable';
import { NgxSelectoModule } from 'ngx-selecto';
import { NgxElementSelectorModule } from 'projects/ngx-element-selector/src/public-api';
import { LetterSpacingComponent } from './toolbar/letter-spacing/letter-spacing.component';
import { TextDecorationComponent } from './toolbar/text-decoration/text-decoration.component';
import { BackgroundPickerComponent } from './picker/background-picker/background-picker.component';
import { ElementsPickerComponent } from './picker/elements-picker/elements-picker.component';
import { OpacityComponent } from './toolbar/opacity/opacity.component';
import { DownloadCanvasComponent } from './download-canvas/download-canvas.component';
import { ElementLayeringComponent } from './toolbar/element-layering/element-layering.component';

@NgModule({
  declarations: [PickersComponent, BuilderComponent, PickerComponent, CanvasComponent, ToolbarComponent,
    ToolbarPanelComponent, ColorPickerComponent, CanvasPreviewComponent, CanvasScaleComponent, TextAlignmentComponent,
    ImagePickerComponent, TextPickerComponent, FontFamilyComponent, VectorPickerComponent, FontSizeComponent,
    SelectElementComponent, DragElementComponent, LetterSpacingComponent, TextDecorationComponent, BackgroundPickerComponent,
    ElementsPickerComponent, OpacityComponent, DownloadCanvasComponent, ElementLayeringComponent],
  imports: [
    CommonModule,
    BuilderRoutingModule,
    SharedModule,
    ColorChromeModule,
    MaterialModule,
    NgxMoveableModule,
    NgxSelectoModule,
    NgxElementSelectorModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BuilderModule { }
