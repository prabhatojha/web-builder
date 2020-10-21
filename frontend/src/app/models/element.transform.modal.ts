
export class ElementTranform {
  rotate = 0;
  translateX = 0;
  translateY = 0;
  scaleX = 1;
  scaleY = 1;

  groupableInfo?: ElementTranform;
  rect?: any;

  constructor(element?: ElementTranform) {
    if (element) {
      this.rotate = element.rotate;
      this.scaleX = element.scaleX;
      this.scaleY = element.scaleY;
      this.translateX = element.translateX;
      this.translateY = element.translateY;
    }
  }

  static toCss(tranformObj: ElementTranform) {
    return `translate(${tranformObj.translateX}px, ${tranformObj.translateY}px) rotate(${tranformObj.rotate}deg)` +
      ` scale(${tranformObj.scaleX}, ${tranformObj.scaleY})`;
  }
}
