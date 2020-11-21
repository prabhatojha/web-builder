import { Component, OnInit } from '@angular/core';
import { AppAnimations } from 'src/style/_angular-animations';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [AppAnimations.ScaleInOut]
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
