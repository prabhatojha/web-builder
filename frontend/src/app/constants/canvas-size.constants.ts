export const CUSTOM_CANVAS_SIZE_ID = 'custom-size';

export const CANVAS_SIZES = [
  {
    id: 'facebook-post',
    label: 'Facebook Post',
    dimention: {
      w: 1200,
      h: 628
    },
    icon: ''
  },
  {
    id: 'facebook-cover',
    label: 'Facebook Cover',
    dimention: {
      w: 800,
      h: 312
    },
    icon: ''
  },
  {
    id: 'instagram-post',
    label: 'Instagram Post',
    dimention: {
      w: 1080,
      h: 1080
    },
    icon: ''
  },
  {
    id: 'instagram-story',
    label: 'Instagram Story',
    dimention: {
      w: 1080,
      h: 1920
    },
    icon: ''
  },
  {
    id: 'twitter-post',
    label: 'Twitter Post',
    dimention: {
      w: 1024,
      h: 512
    },
    icon: ''
  },
  {
    id: 'A5',
    label: 'A5 Document',
    dimention: {
      w: 1240,
      h: 874
    },
    icon: ''
  },
  {
    id: 'A4',
    label: 'A4 Document',
    dimention: {
      w: 1754,
      h: 1240
    },
    icon: ''
  },
  {
    id: 'A3',
    label: 'A3 Document',
    dimention: {
      w: 1653.7,
      h: 1201.7
    },
    icon: ''
  }
];

export enum PROJECT_TYPE {
  BLANK = 'BLANK',
  PUBLIC = 'PUBLIC',
  USER = 'USER'
}
