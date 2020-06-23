import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';

@Injectable({
  providedIn: 'root'
})
export class FontFamilyService {

  FONT_URL = 'https://www.googleapis.com/webfonts/v1/webfonts';

  availableFonts = [];
  MAX_FONT = 50;

  constructor(private http: HttpService) { }

  getFonts() {
    return this.availableFonts;
  }

  private getData() {
    const options = {
      params: {
        sort: 'popularity',
        key: 'AIzaSyCvow7GWJspMK_3yWHOiLt09S8-QmKg4wQ'
      }
    };

    return this.http.get(this.FONT_URL, options);
  }

  loadFonts() {
    this.getData().subscribe((data: any) => {
      this.processFonts(data.items);
    });
  }

  processFonts(fonts: Array<any>) {
    const len = fonts.length;
    for (let i = 0; i < len && i < this.MAX_FONT; i++) {
      const item = {
        label: fonts[i].family,
        value: fonts[i].family,
        url: fonts[i].files.regular
      };
      this.availableFonts.push(item);

      this.createFontFamily(item.label, item.url);
    }
  }

  createFontFamily(family, url) {
    const newStyle = document.createElement('style');
    newStyle.appendChild(document.createTextNode('\@font-face {\
      font-family: ' + family + ';\
      src: url(\'' + url + '\')}'));

    document.head.appendChild(newStyle);
  }
}
