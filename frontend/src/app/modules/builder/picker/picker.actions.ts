import { CONST_VAR } from 'src/app/constants/contants';
import { EventerService, EventTypes } from '../../shared/services/eventer.service';
import { CommonUtils } from 'src/app/utils/common.utils';
import { PickerItemModal } from 'src/app/models/pickers/picker-itemmodal';

export class PickerActions {

  constructor(protected eventer: EventerService) {
  }

  dragStart(ev, item) {
    ev.dataTransfer.setData(CONST_VAR.PICKER_ITEM,
      JSON.stringify(this.buildData(ev, item)));
  }

  onClick(ev, item: PickerItemModal) {
    this.eventer.send({
      type: EventTypes.CANVAS_ADD_ITEM,
      value: CommonUtils.cloneDeep({ item: item.canvasElement })
    });
  }

  buildData(ev, item) {
    const bound = ev.target.getBoundingClientRect();
    return {
      left: ev.clientX - bound.left,
      top: ev.clientY - bound.top,
      item
    };
  }
}
