import { CanvasElement } from '../models/canvas.element.model';
import { PX_APPLICABLE_CSS_PROPS, ElementDimentionModel, CSS_PROPERTIES, ATTR_PROPERTIES } from '../constants/css-constants';
import { CommonUtils } from './common.utils';
import { Hasher } from '../constants/hasher';

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

  private static addDimention(ele, node: CanvasElement) {
    if (node.dimention) {
      this.applyDimention(ele, node, node.dimention);
    }
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

    if (e.clientX && e.clientY && data.left && data.top) {
      const x = e.clientX - canvasBound.left - data.left;
      const y = e.clientY - canvasBound.top - data.top;
      canvasElement.style[CSS_PROPERTIES.TRANSFORM] = `translate(${x}px, ${y}px)`;
    }
  }

  static setDuplicateNodeLocation(canvasElement: CanvasElement) {
    canvasElement.dimention.translateX += 20;
    canvasElement.dimention.translateY += 20;
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

  static applyDimention(node: HTMLElement, item: CanvasElement, dimention: ElementDimentionModel, permanent?: boolean) {
    const obj = {
      [CSS_PROPERTIES.WIDTH]: dimention.width,
      [CSS_PROPERTIES.HEIGHT]: dimention.height,
      [CSS_PROPERTIES.LEFT]: dimention.translateX,
      [CSS_PROPERTIES.TOP]: dimention.translateY
    };

    // Updating width and height
    this.applyCss(node, item, obj, permanent);

    // Updating the transform property
    node.style[CSS_PROPERTIES.TRANSFORM] = this.dimentionCss(dimention);

    if (permanent) {
      item.dimention = CommonUtils.cloneDeep(dimention);
    }
  }

  private static dimentionCss(dimention: ElementDimentionModel) {
    return `${CSS_PROPERTIES.ROTATE}(${dimention.rotate}deg) ` +
      // `${CSS_PROPERTIES.TRANSLATE_X}(${dimention.translateX}px) ` +
      // `${CSS_PROPERTIES.TRANSLATE_Y}(${dimention.translateY}px) ` +
      `${CSS_PROPERTIES.SCALE_X}(${dimention.scaleX}) ` +
      `${CSS_PROPERTIES.SCALE_Y}(${dimention.scaleY}) `;
  }

  // CSS application end


  // Others start
  static setElementId(node, canvasElement: CanvasElement) {
    const id = Hasher.getUuid();
    this.addAttributes(node, { [ATTR_PROPERTIES.ID]: id });
  }
}
