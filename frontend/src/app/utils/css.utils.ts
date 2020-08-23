import { CSS_PROPERTIES } from '../constants/css-constants';

export class CSSUtils {

  static TRANSFORM_ROTATE = /(?<=rotate\()(.*)(?=\s*deg\))/;
  static TRANSFORM_TRANSLATE = /(?<=translate\()(.*)(?=\s*\))/;
  static matrixPattern = /-?\d+\.?\d*/g;
  static MATRIX_2D_LOCATION = {
    [CSS_PROPERTIES.TRANSFORM]: [4, 5]
  };

  static MATRIX_3D_LOCATION = {
    [CSS_PROPERTIES.TRANSFORM]: [13, 14]
  };

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

  static updateTransformValue(styles: any, field: 'rotate' | 'translate' | 'scale', fieldValue): any {
    if (!styles[CSS_PROPERTIES.TRANSFORM]) {
      styles[CSS_PROPERTIES.TRANSFORM] = fieldValue;
    }
    const replacer = fieldValue.split('(')[0];
    styles[CSS_PROPERTIES.TRANSFORM] = styles[CSS_PROPERTIES.TRANSFORM]
      .replace(new RegExp(replacer + '\(.*\)'), fieldValue);
  }


  /**
   * Reading transform value from Matrix
   * @param node HTMLElement
   * @param type anything from CSS_PROPERTIES
   */
  static getMatrixValue(node: Element, type) {
    const parentTransform = window.getComputedStyle(node).transform;
    const values = parentTransform.match(this.matrixPattern);
    if (!values) {
      return [0, 0];
    }
    if (values.length === 6) {
      return this.MATRIX_2D_LOCATION[type].map(index => parseFloat(values[index]));
    } else {
      return this.MATRIX_3D_LOCATION[type].map(index => parseFloat(values[index]));
    }
  }


}
