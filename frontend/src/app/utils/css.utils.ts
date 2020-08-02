import { CSS_PROPERTIES } from '../constants/css-constants';

export class CSSUtils {

  static TRANSFORM_ROTATE = /(?<=rotate\()(.*)(?=\s*deg\))/;
  static TRANSFORM_TRANSLATE = /(?<=translate\()(.*)(?=\s*\))/;


  static getTransformValue(transformStyle, field: 'rotate' | 'translate'): any {
    switch (field) {
      case 'rotate':
        const val = this.matchReg(transformStyle, this.TRANSFORM_ROTATE);
        return val && parseFloat(val);
      case 'translate':
        return this.getTranslateValue(transformStyle);
    }
  }

  private static getTranslateValue(transformStyle) {
    const val = this.matchReg(transformStyle, this.TRANSFORM_TRANSLATE);
    if (val) {
      return {
        x: parseFloat(val.split(',')[0]),
        y: parseFloat(val.split(',')[1])
      };
    }

    return {
      x: 0,
      y: 0
    };
  }

  private static matchReg(value, reg) {
    const result = value && value.match(reg);
    return result && result[0];
  }

  static updateTransformValue(styles: any, field: 'rotate' | 'translate', fieldValue): any {
    if (!styles[CSS_PROPERTIES.TRANSFORM]) {
      styles[CSS_PROPERTIES.TRANSFORM] = fieldValue;
    }
    const replacer = fieldValue.split('(')[0];
    styles[CSS_PROPERTIES.TRANSFORM] = styles[CSS_PROPERTIES.TRANSFORM]
      .replace(new RegExp(replacer + '\(.*\)'), fieldValue);
  }
}
