import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-letter-spacing',
  templateUrl: './letter-spacing.component.html',
  styleUrls: ['./letter-spacing.component.scss']
})
export class LetterSpacingComponent implements OnInit {

  @Input() disabled;

  isVisible = false;
  letterSpacing = 10;
  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    this.isVisible = !this.isVisible;
  }

  letterSpacingChange(e, notNeeded) {
    console.log(e);
  }

  onSliderStop(e) {
    console.log(e);
  }

  onValueChange(e) {
    console.log(e);
  }
}
