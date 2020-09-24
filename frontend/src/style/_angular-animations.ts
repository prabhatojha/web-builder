import { animate, style, transition, trigger } from '@angular/animations';

export const InOut = trigger(
  'InOut',
  [
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
);
