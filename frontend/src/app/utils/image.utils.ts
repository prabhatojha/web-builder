import { CanvasElement } from '../models/canvas.element.model';
import { CSS_PROPERTIES } from '../constants/css-constants';

export class ImageUtils {
  static setInitialWidthAndHeight(projectElement: CanvasElement, canvasEle: CanvasElement) {

    const imgW = parseFloat(canvasEle.style[CSS_PROPERTIES.WIDTH]);
    const imgH = parseFloat(canvasEle.style[CSS_PROPERTIES.HEIGHT]);

    const proW = parseFloat(projectElement.style[CSS_PROPERTIES.WIDTH]);
    const proH = parseFloat(projectElement.style[CSS_PROPERTIES.HEIGHT]);

    ImageUtils.getImageRatio(proW, proH, imgW, imgH, canvasEle);

  }

  private static getImageRatio(proW, proH, imgW, imgH, canvasEle: CanvasElement) {
    while (imgW > proW || imgH > proH) {
      imgW /= 2;
      imgH /= 2;
    }

    canvasEle.style[CSS_PROPERTIES.WIDTH] = imgW;
    canvasEle.style[CSS_PROPERTIES.HEIGHT] = imgH;
  }
}
