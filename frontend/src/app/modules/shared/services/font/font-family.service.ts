import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';

@Injectable({
  providedIn: 'root'
})
export class FontFamilyService {

  FONT_URL = 'https://www.googleapis.com/webfonts/v1/webfonts';

  customTextFonts = [
    {
      family: 'Josefin Sans',
      files: { regular: 'http://fonts.gstatic.com/s/josefinsans/v16/Qw3PZQNVED7rKGKxtqIqX5E-AVSJrOCfjY46_DjQXMFrLgTsQV0.ttf' },
      fontSize: '40px',
      innerText: 'Add header'
    },
    {
      family: 'Josefin Sans',
      files: { regular: 'http://fonts.gstatic.com/s/josefinsans/v16/Qw3PZQNVED7rKGKxtqIqX5E-AVSJrOCfjY46_DjQXMFrLgTsQV0.ttf' },
      fontSize: '24px',
      innerText: 'Add sub header'
    }
    // {
    //   family: 'Sriracha',
    //   files: { regular: 'http://fonts.gstatic.com/s/rajdhani/v9/LDIxapCSOBg7S-QT7q4AOeekWPrP.ttf' },
    //   fontSize: '35px',
    //   innerText: 'Enter Text'
    // },
    // {
    //   family: 'Metal Mania',
    //   files: { regular: 'http://fonts.gstatic.com/s/metalmania/v9/RWmMoKWb4e8kqMfBUdPFJeXCg6UKDXlq.ttf' },
    //   fontSize: '30px',
    //   innerText: 'Enter Text'
    // },
    // {
    //   family: 'Piedra',
    //   files: { regular: 'http://fonts.gstatic.com/s/piedra/v8/ke8kOg8aN0Bn7hTunEyHN_M3gA.ttf' },
    //   fontSize: '30px',
    //   innerText: 'Enter Text'
    // },
    // {
    //   family: 'Odibee Sans',
    //   files: { regular: 'http://fonts.gstatic.com/s/odibeesans/v1/neIPzCSooYAho6WvjeToRYkyepH9qGsf.ttf' },
    //   fontSize: '30px',
    //   innerText: 'Enter Text'
    // },
    // {
    //   family: 'Staatliches',
    //   files: { regular: 'http://fonts.gstatic.com/s/staatliches/v3/HI_OiY8KO6hCsQSoAPmtMbectJG9O9PS.ttf' },
    //   fontSize: '30px',
    //   innerText: 'Enter Text'
    // },
    // {
    //   family: 'Lexend Tera',
    //   files: { regular: 'http://fonts.gstatic.com/s/lexendtera/v1/RrQUbo98_jt_IXnBPwCWtZhARYMgGtWA.ttf' },
    //   fontSize: '30px',
    //   innerText: 'Enter Text'
    // }
  ];

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
      src: url(\'' + url + '\')}'));

    document.head.appendChild(newStyle);
  }
}
