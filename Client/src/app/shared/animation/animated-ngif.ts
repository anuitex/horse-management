//Vendors
import { animate, trigger, transition, style } from '@angular/animations';

export const fadeDownItem = trigger('fadeDownItem', [
  transition(':enter', [
    style({
      opacity: 0,
      height: 0
    }),
    animate('400ms',
      style({
        opacity: 1,
        height: '60px'

      })
    )]
  ),
  transition(':leave',
    [
      style({
        opacity: 1,
        height: '60px'

      }),
      animate('400ms',
        style({
          opacity: 0,
          height: 0
        })
      )]
  )
]);
