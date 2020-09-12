import { CanvasElement } from '../models/canvas.element.model';
import { PX_APPLICABLE_CSS_PROPS, ElementDimentionModel, CSS_PROPERTIES, ATTR_PROPERTIES, CSS_CLASSES } from '../constants/css-constants';
import { CommonUtils } from './common.utils';
import { Hasher } from '../constants/hasher';
import { CSSUtils } from './css.utils';
import { ElementTranform } from '../models/element.transform.modal';

export class CanvasUtils {

  // Building DOM element start here ----------------

  static buildDom(node: CanvasElement) {
    const ele = document.createElement(node.tag);
    this.addElementStyle(ele, node.style);
    this.addInnerText(ele, node.innerText);
    this.addAttributes(ele, node.attribute);
    // this.addDimention(ele, node);

    if (node.children) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < node.children.length; i++) {
        ele.appendChild(this.buildDom(node.children[i]));
      }
    }

    return ele;
  }


  private static addAttributes(ele, attrs) {
    if (attrs) {
      Object.keys(attrs).forEach(key => {
        ele.setAttribute(key, attrs[key]);
      });
    }
  }

  private static addElementStyle(ele, style) {
    if (style) {
      Object.keys(style).forEach(key => {
        ele.style[key] = style[key];
      });
    }
  }

  private static addInnerText(ele, innerText) {
    if (innerText) {
      ele.innerText = innerText;
    }
  }

  // Building DOM element end here ----------------

  // Print element Start --------------------------

  static print(printContents): void {
    const popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

  // Print element end -----------------------------


  // Element Location/placement start ------------------------
  static setInitialNodeLocation(e, data, canvasBound) {
    const canvasElement: CanvasElement = data.item.canvasElement;
    canvasElement.transform = new ElementTranform();

    if (e.clientX && e.clientY && data.left && data.top) {
      canvasElement.transform.translateX = e.clientX - canvasBound.left - data.left;
      canvasElement.transform.translateY = e.clientY - canvasBound.top - data.top;

      canvasElement.style[CSS_PROPERTIES.TRANSFORM] = ElementTranform.toCss(canvasElement.transform);
    }
  }

  static setDuplicateNodeLocation(canvasElement: CanvasElement) {
    canvasElement.transform.translateX += 20;
    canvasElement.transform.translateY += 20;

    canvasElement.style[CSS_PROPERTIES.TRANSFORM] = ElementTranform.toCss(canvasElement.transform);
  }

  /* Group Ungrouping - start */

  static setGroupNodeLocation(nodes: HTMLElement[], canvasElement: CanvasElement, canvas: HTMLElement) {
    const parent = CSSUtils.getElementByClassName(CSS_CLASSES.MOVEABLE_CONTOLL_BOX);
    const parentTranslate = CSSUtils.getTransformValue(parent.style.transform, CSS_PROPERTIES.TRANSLATE);
    const moveableArea = CSSUtils.getElementByClassName(CSS_CLASSES.MOVEABLE_AREA);
    const moveableAreaRotate = CSSUtils.getTransformValue(moveableArea.style.transform, CSS_PROPERTIES.ROTATE);
    const moveableAreaScale = CSSUtils.getTransformValue(moveableArea.style.transform, CSS_PROPERTIES.SCALE);

    canvasElement.children.forEach((child: CanvasElement) => {
      const transform = child.transform.groupableInfo;
      transform.scaleX = child.transform.scaleX;
      transform.scaleY = child.transform.scaleY;
      child.style[CSS_PROPERTIES.TRANSFORM] = ElementTranform.toCss(transform);
      child.transform = transform;
    });

    canvasElement.style[CSS_PROPERTIES.WIDTH] = moveableArea.style[CSS_PROPERTIES.WIDTH];
    canvasElement.style[CSS_PROPERTIES.HEIGHT] = moveableArea.style[CSS_PROPERTIES.HEIGHT];
    canvasElement.transform = new ElementTranform({
      translateX: parentTranslate.x,
      translateY: parentTranslate.y,
      rotate: moveableAreaRotate,
      scaleX: moveableAreaScale.x,
      scaleY: moveableAreaScale.y
    });

    canvasElement.style[CSS_PROPERTIES.TRANSFORM] = ElementTranform.toCss(canvasElement.transform);
  }

  /* Group Ungrouping - start */

  static setUnGroupNodeLocation(node: HTMLElement, canvasElement: CanvasElement) {

  }

  // Element Duplicate/placement end ------------------------


  // CSS application start

  static applyCss(node: HTMLElement, item: CanvasElement, styles, permanent?: boolean) {
    Object.keys(styles).forEach(prop => {
      const value = this._getStyleValue(prop, styles[prop]);
      node.style[prop] = value;

      if (permanent) {
        item.style[prop] = value;
      }
    });
  }

  static _getStyleValue(key: string, value: string | number) {
    // handle zero
    if (!value && value !== 0) {
      return '';
    }

    if (typeof value === 'string' && value.endsWith('px')) {
      return value;
    }

    if (PX_APPLICABLE_CSS_PROPS.includes(key)) {
      return value + 'px';
    }

    return value;
  }

  // Others start
  static setElementId(node, canvasElement: CanvasElement) {
    const id = Hasher.getUuid();
    this.addAttributes(node, { [ATTR_PROPERTIES.ID]: id });
  }

  static getClonedStylesAsText(items: CanvasElement[]) {
    return items.map(t => {
      return CSSUtils.toText(CommonUtils.cloneDeep(t.style));
    });
  }
}
