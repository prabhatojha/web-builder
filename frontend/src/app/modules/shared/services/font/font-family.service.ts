import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';

@Injectable({
  providedIn: 'root'
})
export class FontFamilyService {

  FONT_URL = 'api/fonts';

  customTextFonts = [
    {
      family: 'Josefin Sans',
      files: { regular: 'http://fonts.gstatic.com/s/josefinsans/v16/Qw3PZQNVED7rKGKxtqIqX5E-AVSJrOCfjY46_DjQXMFrLgTsQV0.ttf' },
      fontSize: '32px',
      innerText: 'Add a heading'
    },
    {
      family: 'Josefin Sans',
      files: { regular: 'http://fonts.gstatic.com/s/josefinsans/v16/Qw3PZQNVED7rKGKxtqIqX5E-AVSJrOCfjY46_DjQXMFrLgTsQV0.ttf' },
      fontSize: '24px',
      innerText: 'Add a sub heading'
    },
    {
      family: 'Josefin Sans',
      files: { regular: 'http://fonts.gstatic.com/s/josefinsans/v16/Qw3PZQNVED7rKGKxtqIqX5E-AVSJrOCfjY46_DjQXMFrLgTsQV0.ttf' },
      fontSize: '16px',
      innerText: 'Add content'
    },
    {
      family: 'Yatra One',
      files: { regular: 'http://fonts.gstatic.com/s/yatraone/v7/C8ch4copsHzj8p7NaF0xw1OBbRDvXw.ttf' },
      fontSize: '16px',
      innerText: 'Yatra One'
    },
    {
      family: 'Alegreya',
      files: { regular: 'http://fonts.gstatic.com/s/alegreya/v15/4UaBrEBBsBhlBjvfkRLmzanB44N1.ttf' },
      fontSize: '16px',
      innerText: 'Alegreya'
    },
    {
      family: 'B612',
      files: { regular: 'http://fonts.gstatic.com/s/b612/v5/3JnySDDxiSz32jm4GDigUXw.ttf' },
      fontSize: '16px',
      innerText: 'B612'
    },
    {
      family: 'Cairo',
      files: { regular: 'http://fonts.gstatic.com/s/cairo/v9/SLXGc1nY6HkvamImRJqExst1.ttf' },
      fontSize: '16px',
      innerText: 'Cairo'
    },
    {
      family: 'Karla',
      files: { regular: 'http://fonts.gstatic.com/s/karla/v13/qkBbXvYC6trAT4RSJN225aZO.ttf' },
      fontSize: '16px',
      innerText: 'Karla'
    },
    {
      family: 'Fjalla One',
      files: { regular: 'http://fonts.gstatic.com/s/fjallaone/v8/Yq6R-LCAWCX3-6Ky7FAFnOZwkxgtUb8.ttf' },
      fontSize: '16px',
      innerText: 'Fjalla One'
    }
  ];

  availableFonts = [];
  MAX_FONT = 600;

  constructor(private http: HttpService) { }

  getFonts() {
    return this.availableFonts;
  }

  private getData() {

    return this.http.get(this.FONT_URL);
  }

  loadFonts() {
    this.getData().subscribe((data: any) => {
      this.processFonts(data.items);
    });

    // This add few fonts on top of the list
    this.loadCustomFonts();
  }

  loadCustomFonts() {
    this.processFonts(this.customTextFonts, true);
  }

  processFonts(fonts: Array<any>, customFonts = false) {
    const len = fonts.length;
    for (let i = 0; i < len && i < this.MAX_FONT; i++) {
      const item = {
        label: fonts[i].family,
        value: fonts[i].family
      };

      if (!customFonts || !this.availableFonts.some(t => t.label === fonts[i].family)) {
        this.availableFonts.push(item);
      }

      this.createFontFamily(item.label, fonts[i].files.regular);
    }
  }

  createFontFamily(family, url) {
    const newStyle = document.createElement('style');
    newStyle.appendChild(document.createTextNode('\@font-face {\
      font-family: ' + family + ';\
      src: url(\'' + (url && url.replace('http', 'https')) + '\')}'));
    document.head.appendChild(newStyle);
  }
}
