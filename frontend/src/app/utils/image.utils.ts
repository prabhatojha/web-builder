import { CanvasElement } from '../models/canvas.element.model';

export class ImageUtils {
  static setInitialWidthAndHeight(dimention, canvasEle: CanvasElement) {

    const imgW = canvasEle.width;
    const imgH = canvasEle.height;

    const proW = dimention.width;
    const proH = dimention.height;

    ImageUtils.getImageRatio(proW, proH, imgW, imgH, canvasEle);

  }

  private static getImageRatio(proW, proH, imgW, imgH, canvasEle: CanvasElement) {
    while (imgW > proW || imgH > proH) {
      imgW /= 2;
      imgH /= 2;
    }

    canvasEle.style.width = imgW + 'px';
    canvasEle.style.height = imgH + 'px';
  }
}
