import { NgModule } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';


@NgModule({
  imports: [
    MatTooltipModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatSliderModule,

  ],
  exports: [
    MatTooltipModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatSliderModule
  ]
})
export class MaterialModule { }
