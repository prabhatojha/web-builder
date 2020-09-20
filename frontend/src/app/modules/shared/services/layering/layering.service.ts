import { Injectable } from '@angular/core';
import { CanvasElement } from 'src/app/models/canvas.element.model';
import { CommonUtils } from 'src/app/utils/common.utils';

export enum LayeringActions {
  MOVE_TO_FRONT,
  MOVE_TO_LAST,
  SEND_BACKWARD,
  BRING_FORWARD
}

@Injectable({
  providedIn: 'root'
})
export class LayeringService {

  constructor() { }

  doAction(nodes: HTMLElement[], canvasElements: CanvasElement[], selectedNode: HTMLElement, action: LayeringActions) {
    let sourceIndex = 0;
    for (const node of nodes) {
      if (selectedNode === node) {
        break;
      }
      sourceIndex++;
    }

    // 500, 501, 502, 503, 504, 505
    // 0    1    2    3    4    5

    switch (action) {
      case LayeringActions.MOVE_TO_LAST:
        if (sourceIndex > 0) {
          CommonUtils.insertNodeBefore(selectedNode, nodes[0]);
          canvasElements.unshift(canvasElements.splice(sourceIndex, 1)[0]);
        }
        break;
      case LayeringActions.MOVE_TO_FRONT:
        if (sourceIndex < canvasElements.length - 1) {
          CommonUtils.insertNodeBefore(selectedNode, null);
          canvasElements.push(canvasElements.splice(sourceIndex, 1)[0]);
        }
        break;
      case LayeringActions.BRING_FORWARD:
        if (sourceIndex < canvasElements.length - 1) {
          CommonUtils.insertNodeBefore(selectedNode, nodes[sourceIndex + 2]);
          CommonUtils.swapArrayElements(canvasElements, sourceIndex, sourceIndex + 1);
        }
        break;
      case LayeringActions.SEND_BACKWARD:
        if (sourceIndex > 0) {
          CommonUtils.insertNodeBefore(selectedNode, nodes[sourceIndex - 1]);
          CommonUtils.swapArrayElements(canvasElements, sourceIndex, sourceIndex - 1);
        }
        break;
    }
  }
}
