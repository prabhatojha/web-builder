import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-easy-login',
  templateUrl: './easy-login.component.html',
  styleUrls: ['./easy-login.component.scss']
})
export class EasyLoginComponent implements OnInit {

  @Input() type: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
