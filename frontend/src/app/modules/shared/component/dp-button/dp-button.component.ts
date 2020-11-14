import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dp-button',
  templateUrl: './dp-button.component.html',
  styleUrls: ['./dp-button.component.scss']
})
export class DpButtonComponent implements OnInit {

  @Input() disabled = false;
  @Input() loading = false;
  @Input() type = 'submit';
  @Input() title = 'Submit';
  @Input() loadingTitle = 'Loading...';

  constructor() { }

  ngOnInit(): void {
  }

}
