import { animate, state, style, transition, trigger } from '@angular/animations';

export const AppAnimations = {
  InOut: trigger('InOut', [
    transition(
      ':enter',
      [
        style({ opacity: 0 }),
        animate('0.25s ease-out',
          style({ opacity: 1 }))
      ]
    ),
    transition(
      ':leave',
      [
        style({ opacity: 1 }),
        animate('0.25s ease-in',
          style({ opacity: 0 }))
      ]
    )
  ]
  ),
  ScaleInOut: trigger('ScaleInOut', [
    transition(
      ':enter',
      [
        style({ opacity: 0, transform: 'scale(0.3)' }),
        animate('0.25s ease-out',
          style({ opacity: 1, transform: 'scale(1)' }))
      ]
    ),
    transition(
      ':leave',
      [
        style({ opacity: 1, transform: 'scale(1)' }),
        animate('0.25s ease-in',
          style({ opacity: 0, transform: 'scale(0.3)' }))
      ]
    )
  ]
  ),
  SlideDown: trigger('SlideDown', [
    state('*', style({})),
    state('void', style({})),
    transition('* => void', [
      style({ height: '*', overflow: 'hidden' }),
      animate(150, style({ height: 0 })),
    ]),
    transition('void => *', [
      style({ height: '0', overflow: 'hidden' }),
      animate(150, style({ height: '*' }))
    ])
  ]
  ),

  SlideRight: trigger('SlideRight', [
    state('*', style({})),
    state('void', style({})),
    transition('* => void', [
      style({ height: '*', overflow: 'hidden' }),
      animate(400, style({ width: 0 })),
    ]),
    transition('void => *', [
      style({ height: '0', overflow: 'hidden' }),
      animate(400, style({ width: '*' }))
    ])
  ]
  )
};
