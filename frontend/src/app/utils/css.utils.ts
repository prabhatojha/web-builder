export class CSSUtils {

  static TRANSFORM_ROTATE = /(?<=rotate\()(.*)(?=\s*deg\))/;

  static getTransformValue(value, field: 'rotate') {
    switch (field) {
      case 'rotate':
        return this.matchReg(value, this.TRANSFORM_ROTATE);
    }
  }

  private static matchReg(value, reg) {
    const result = value && value.match(reg);
    return result && parseFloat(result[0]);
  }
}