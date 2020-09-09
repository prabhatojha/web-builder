import { ELEMENT_TYPES } from '../constants/contants';
import { ElementTranform } from './element.transform.modal';

export class CanvasElement {
  type: ELEMENT_TYPES;
  // width: number;
  // height: number;
  transform: ElementTranform = new ElementTranform();

  tag: string;
  attribute: {
    [attr: string]: string
  };
  style: {
    [style: string]: string | number | any;
  };
  innerText: string;
  children: Array<CanvasElement>;
  locked: boolean;

  constructor(tag, attribute, style, children) {
    this.tag = tag;
    this.attribute = attribute;
    this.style = style;
    this.children = children;
  }
}
