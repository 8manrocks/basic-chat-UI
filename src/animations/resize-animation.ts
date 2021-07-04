import { trigger, animate, transition, style } from '@angular/animations';

export const reSizeAnimation =
    // trigger name for attaching this animation to an element using the [@triggerName] syntax
    trigger('reSizeAnimation', [

        // route 'enter' transition
        transition(':enter', [

            // css styles at start of transition
            style({ height: '100vh' }),

            // animation and styles at end of transition
            animate('5s', style({ height: '20vh' }))
        ]),
    ]);