import { Component, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FontFamilyService } from './modules/shared/services/font/font-family.service';
import { FaConfig } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  ENABLE_UNSAVED_RELOAD = false;

  constructor(private httpClient: HttpClient, private fontService: FontFamilyService, faConfig: FaConfig) {
    faConfig.fixedWidth = true;
    this.fontService.loadFonts();
    this.confirmReload();
  }

  confirmReload() {
    window.addEventListener('beforeunload', (e) => {
      if (this.ENABLE_UNSAVED_RELOAD) {
        e.preventDefault();
        e.returnValue = 'Stay';
        return 'Stay';
      }
    });
  }
}
