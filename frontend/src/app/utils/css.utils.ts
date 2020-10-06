import { CSS_PROPERTIES, CSS_PROPERTY_VALUES } from '../constants/css-constants';
import { CanvasElement } from '../models/canvas.element.model';

export class CSSUtils {

  static TRANSFORM_ROTATE = /(?<=rotate\()(.*)(?=\s*deg\))/;
  static TRANSFORM_TRANSLATE = /(?<=translate\()(.*)(?=\s*\))/;
  static TRANSFORM_SCALE = /(?<=scale\()(.*)(?=\s*\))/;
  static matrixPattern = /-?\d+\.?\d*/g;
  static MATRIX_2D_LOCATION = {
    [CSS_PROPERTIES.TRANSLATE]: [4, 5]
  };

  static MATRIX_3D_LOCATION = {
    [CSS_PROPERTIES.TRANSLATE]: [12, 13]
  };

  static getTransformValue(transformStyle, field: string): any {
    switch (field) {
      case CSS_PROPERTIES.ROTATE:
        const val = this.matchReg(transformStyle, this.TRANSFORM_ROTATE);
        return val && parseFloat(val);
      case CSS_PROPERTIES.TRANSLATE:
        return this.getTranslateValue(transformStyle, this.TRANSFORM_TRANSLATE);
      case CSS_PROPERTIES.SCALE:
        return this.getScaleValue(transformStyle, this.TRANSFORM_SCALE);
    }
  }

  private static getTranslateValue(transformStyle, regex) {
    const val = this.matchReg(transformStyle, regex);
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

  private static getScaleValue(transformStyle, regex) {
    const val = this.matchReg(transformStyle, regex);
    if (val) {
      return {
        x: parseFloat(val.split(',')[0]),
        y: parseFloat(val.split(',')[1])
      };
    }

    return {
      x: 1,
      y: 1
    };
  }

  private static matchReg(value, reg) {
    const result = value && value.match(reg);
    return result && result[0];
  }

  static updateTransformValue(styles: any, field: 'rotate' | 'translate' | 'scale', fieldValue): any {
    if (!styles[CSS_PROPERTIES.TRANSFORM] || styles[CSS_PROPERTIES.TRANSFORM] === CSS_PROPERTY_VALUES.NONE) {
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
    const matrix = this.getComputedStyle(node, CSS_PROPERTIES.TRANSFORM);
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

  static toText(styles) {
    return JSON.stringify(styles);
  }

  static getComputedStyle(node: Element, cssProperty) {
    return window.getComputedStyle(node)[cssProperty];
  }

  /**
   *
   * @param mat Matrix representation of transform
   * @param type CSS property like, translate, scale etc.
   * @param newValues if translate, pass as "[x, y]"
   */
  static setMatrixValue(mat: Array<number>, type, newValues: Array<number>) {
    const locations: Array<number> = mat.length === 6 ? this.MATRIX_2D_LOCATION[type] : this.MATRIX_3D_LOCATION[type];
    locations.forEach((loc, idx) => {
      mat[loc] = newValues[idx];
    });
    return mat;
  }

  static matrixToCssText(mat) {
    return `matrix(${mat.join()})`;
  }

  static getElementByClassName(className): any {
    return document.getElementsByClassName(className)[0];
  }
}
