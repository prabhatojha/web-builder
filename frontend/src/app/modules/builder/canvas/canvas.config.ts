import { ImageCanvasElement } from 'src/app/models/image.element.model';
import { CanvasElement } from 'src/app/models/canvas.element.model';

export const IMAGE_TOOLBAR_OPTIONS = [8, 4, 11];
export const IMAGE_CONTAINER_DEFAULT_STYLE = {
  'text-align': 'center',
  'position': 'absolute',
  'cursor': 'move',
  'user-select': 'none',
  'width': '279px',
  'height': '185px'
};

export const IMAGE_TAG_DEFAULT_STYLE = {
  'cursor': 'move',
  'width': '100%',
  'height': '100%',
  'object-fit': 'cover'
};

export const IMAGE_TAG_DEFAULT_ATTRIBUTE = {
  'src': ''
};

export function getImageElementInstance(): ImageCanvasElement {
  const child = new CanvasElement('img', IMAGE_TAG_DEFAULT_ATTRIBUTE, IMAGE_TAG_DEFAULT_STYLE, []);
  const canvasElement = new CanvasElement('div', {}, IMAGE_CONTAINER_DEFAULT_STYLE, [child]);

  return new ImageCanvasElement('', IMAGE_TOOLBAR_OPTIONS, '', canvasElement);
}

export const DEFAULT_TEXT_CSS = {

};


// {
//   id: 'askfljkjasfaskls',
//   toolbarOptions: [8, 4, 11],
//   imageUrl: '/assets/images/pickers/resize-1590238348409394631girl5352511920.jpg',
//   canvaElement: DEFAULT_IMAGE_ELEMENT
// }


// export const DEFAULT_IMAGE_ELEMENT = {
//   tag: 'div',
//   attribute: {
//   },
//   style: {
//     'text-align': 'center',
//     'position': 'absolute',
//     'cursor': 'move',
//     'user-select': 'none',
//     'width': '279px',
//     'height': '185px'
//   },
//   children: [
//     {
//       tag: 'img',
//       style: {
//         'cursor': 'move',
//         'width': '100%',
//         'height': '100%',
//         'object-fit': 'cover'

//       },
//       attribute: {
//         src: '/assets/images/pickers/girl-535251_1920.jpg'
//       }
//     }
//   ]
// };
