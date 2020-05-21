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
  }
]

export const PICKERS = {
  2: [
    {
      tag: 'label',
      text: 'Enter your text',
      elementId: 'my-first-element',
      id: 'xzkljasf214assaf',
      type: 'image',
      toolbarOptions: [0, 1, 3, 6, 7],
      searchKeywords: [],
      canvaElement: {
        tag: 'div',
        attribute: {
          tabindex: '-1',
        },
        style: {
          'font-size': '40px',
          'font-family': 'cursive',
          'text-align': 'center',
          'position': 'absolute',
          'cursor': 'move'
        },
        children: [{
          tag: 'label',
          innerText: 'nice, good & great',
          style: {
            cursor: 'move'
          }
        }]
      },
      imageUrl: '/assets/images/pickers/my-item2.png'
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
  5: [{
    tag: 'img',
    text: null,
    children: [],
    style: {
      width: '100px',
      height: '100px',
      border: '1px solid grey',
      position: 'absolute'
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
