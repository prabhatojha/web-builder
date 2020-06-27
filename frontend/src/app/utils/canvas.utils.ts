import { CanvasElement } from '../models/canvas.element.model';

export class CanvasUtils {

  // Building DOM element start here ----------------

  static buildDom(node) {
    const ele = document.createElement(node.tag);
    this.addElementStyle(ele, node.style);
    this.addInnerText(ele, node.innerText);
    this.addAttributes(ele, node.attribute);

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
  static getInitialNodeLocation(e, pickerLeft, pickerTop, canvasBound) {
    let x = '0px';
    let y = '0px';

    if (e.clientX && e.clientY && pickerLeft && pickerTop) {
      x = e.clientX - canvasBound.left - pickerLeft + 'px';
      y = e.clientY - canvasBound.top - pickerTop + 'px';
    }

    return {
      x,
      y
    };
  }

  static getDuplicateNodeLocation(canvasElement: CanvasElement) {
    return {
      x: parseInt(canvasElement.style.left, 10) + 20 + 'px',
      y: parseInt(canvasElement.style.top, 10) + 20 + 'px'
    };
  }
  // Element Duplicate/placement end ------------------------
}
