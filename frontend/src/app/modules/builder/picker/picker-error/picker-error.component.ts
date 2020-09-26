import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-picker-error',
  templateUrl: './picker-error.component.html',
  styleUrls: ['./picker-error.component.scss']
})
export class PickerErrorComponent implements OnInit {

  @Input() errorMsg: string;
  @Input() tryAgainBtn: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
