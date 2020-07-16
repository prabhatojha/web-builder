import { CanvasElement } from '../models/canvas.element.model';

export class ImageUtils {
  static setInitialWidthAndHeight(dimention, canvasEle: CanvasElement) {

    const imgW = canvasEle.dimention.width;
    const imgH = canvasEle.dimention.height;

    const proW = dimention.width;
    const proH = dimention.height;

    ImageUtils.getImageRatio(proW, proH, imgW, imgH, canvasEle);

  }

  private static getImageRatio(proW, proH, imgW, imgH, canvasEle: CanvasElement) {
    while (imgW > proW || imgH > proH) {
      imgW /= 2;
      imgH /= 2;
    }

    canvasEle.dimention.width = imgW;
    canvasEle.dimention.height = imgH;
  }
}
