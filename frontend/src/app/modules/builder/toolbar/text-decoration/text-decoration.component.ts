import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-decoration',
  templateUrl: './text-decoration.component.html',
  styleUrls: ['./text-decoration.component.scss']
})
export class TextDecorationComponent implements OnInit {

  showPanel = false;

  letterSpacing = 0;
  lineHeight = 0;

  constructor() { }

  ngOnInit(): void {
  }

  toggleOptions() {
    this.showPanel = !this.showPanel;
  }

}
