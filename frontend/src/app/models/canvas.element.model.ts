export class CanvasElement {
  tag: string;
  attribute: {
    [attr: string]: string | string[]
  };
  style: {
    [attr: string]: string | string[]
  };
  children: Array<CanvasElement>;

  constructor(tag, attribute, style, children) {
    this.tag = tag;
    this.attribute = attribute;
    this.style = style;
    this.children = children;
  }
}
