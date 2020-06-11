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
  5: []
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
