import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FontFamilyService } from './modules/shared/services/font/font-family.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  constructor(private httpClient: HttpClient, private fontService: FontFamilyService) {
    this.fontService.loadFonts();
  }
}
