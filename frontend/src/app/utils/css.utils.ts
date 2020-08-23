import { CSS_PROPERTIES } from '../constants/css-constants';

export class CSSUtils {

  static TRANSFORM_ROTATE = /(?<=rotate\()(.*)(?=\s*deg\))/;
  static TRANSFORM_TRANSLATE = /(?<=translate\()(.*)(?=\s*\))/;
  static matrixPattern = /-?\d+\.?\d*/g;
  static MATRIX_2D_LOCATION = {
    [CSS_PROPERTIES.TRANSLATE]: [4, 5]
  };

  static MATRIX_3D_LOCATION = {
    [CSS_PROPERTIES.TRANSLATE]: [13, 14]
  };

  static getTransformValue(transformStyle, field: 'rotate' | 'translate' | string): any {
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
      return;
    }
    const replacer = fieldValue.split('(')[0];
    if (styles[CSS_PROPERTIES.TRANSFORM].includes(replacer)) {
      styles[CSS_PROPERTIES.TRANSFORM] = styles[CSS_PROPERTIES.TRANSFORM]
        .replace(new RegExp(replacer + '\(.*\)'), fieldValue);
    } else {
      styles[CSS_PROPERTIES.TRANSFORM] = styles[CSS_PROPERTIES.TRANSFORM] + ` ${fieldValue}`;
    }

  }


  /**
   * Reading transform value from Matrix
   * @param node HTMLElement
   * @param type anything from CSS_PROPERTIES
   */
  static getMatrixValue(node: Element, type) {
    const matrix = window.getComputedStyle(node).transform;

    let values: any = matrix.split('(')[1];
    values = values.split(')')[0];
    values = values.split(',');

    if (!values) {
      return [0, 0];
    }

    // If someone needs complete matrix
    if (type === CSS_PROPERTIES.TRANSFORM) {
      return values.map(val => parseFloat(val));
    }

    if (values.length === 6) {
      return this.MATRIX_2D_LOCATION[type].map(index => parseFloat(values[index]));
    } else {
      return this.MATRIX_3D_LOCATION[type].map(index => parseFloat(values[index]));
    }
  }

  static getRotationValue(node: Element) {
    const values = this.getMatrixValue(node, CSS_PROPERTIES.TRANSFORM);
    const a = values[0];
    const b = values[1];

    return Math.round(Math.atan2(b, a) * (180 / Math.PI));
  }
}
