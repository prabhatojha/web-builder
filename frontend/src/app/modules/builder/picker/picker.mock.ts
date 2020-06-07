export const LEFT_MENU_ITEMS = [
  {
    id: 2,
    label: 'Text',
    icon: 'text_fields',
    type: 'text'
  },
  {
    id: 5,
    label: 'Photo',
    icon: 'image_search'
  },
  {
    id: 6,
    label: 'Upload',
    icon: 'cloud_upload'
  },
  {
    id: 7,
    label: 'Shapes',
    icon: 'design_services'
  }
];

export const PICKERS = {
  2: [
    {
      tag: 'label',
      text: 'Enter your text',
      elementId: 'my-first-element',
      id: 'xzkljasf214assaf',
      type: 'image',
      toolbarOptions: [0, 1, 3, 4, 6, 7, 8, 10, 11],
      searchKeywords: [],
      canvaElement: {
        tag: 'div',
        type: 'text',
        attribute: {
        },
        style: {
          'font-size': '24px',
          'font-family': 'monospace',
          'text-align': 'center',
          'position': 'absolute',
          'cursor': 'move',
          'user-select': 'none',
          'width': '320px',
          'height': '68px'
        },
        children: [
          {
            tag: 'label',
            innerText: 'Double click to type',
            style: {
              cursor: 'move'
            }
          }
        ]
      },
      imageUrl: '/assets/images/pickers/add-text.png'
    }],
  3: [{
    tag: 'button',
    text: 'Submit',
    children: [],
    style: {
      padding: '10px 18px',
      position: 'absolute'
    }
  }],
  4: [{
    tag: 'a',
    text: 'My link',
    children: [],
    style: {
      padding: '10px 18px',
      position: 'absolute'
    }
  }],
  5: [
    {
      tag: 'label',
      elementId: 'my-first-element',
      id: 'askfljkjasf;askls',
      type: 'image',
      toolbarOptions: [8, 4, 11],
      searchKeywords: [],
      imageUrl: '/assets/images/pickers/resize-1590238348409394631girl5352511920.jpg',
      canvaElement: {
        tag: 'div',
        attribute: {
        },
        style: {
          'text-align': 'center',
          'position': 'absolute',
          'cursor': 'move',
          'user-select': 'none',
          'width': '279px',
          'height': '185px'
        },
        children: [
          {
            tag: 'img',
            style: {
              'cursor': 'move',
              'width': '100%',
              'height': '100%',
              'object-fit': 'cover'

            },
            attribute: {
              src: '/assets/images/pickers/girl-535251_1920.jpg'
            }
          }
        ]
      }
    },
    {
      tag: 'label',
      elementId: 'my-first-element',
      id: 'askfljkjasf;askls',
      type: 'image',
      toolbarOptions: [8],
      searchKeywords: [],
      imageUrl: '/assets/images/pickers/resize-1590238397581797230sky51860161920.jpg',
      canvaElement: {
        tag: 'div',
        attribute: {
        },
        style: {
          'text-align': 'center',
          'position': 'absolute',
          'cursor': 'move',
          'user-select': 'none',
          'width': '288px',
          'height': '192px'
        },
        children: [
          {
            tag: 'img',
            style: {
              'cursor': 'move',
              'width': '100%',
              'height': '100%',
              'object-fit': 'cover'
            },
            attribute: {
              src: '/assets/images/pickers/sky-5186016_1920.jpg'
            }
          }
        ]
      }
    }]
};


export const CANVAS_ELEMENTS = [
  {
    tag: 'label',
    type: 'text',
    id: 'my-first-element',
    text: 'Enter your text',
    children: [],
    style: {
      position: 'relative'
    }
  }
];
