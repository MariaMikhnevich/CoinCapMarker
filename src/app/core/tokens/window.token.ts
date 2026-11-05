import { DOCUMENT } from '@angular/common';
import { inject, InjectionToken } from '@angular/core';

type GlobalWindow = Window & typeof globalThis;

export const WINDOW = new InjectionToken<GlobalWindow>('Window', {
    providedIn: 'root',
    factory: (): GlobalWindow => {
        const { defaultView } = inject(DOCUMENT);

        if (!defaultView) {
            throw new Error('Window is not available');
        }

        return defaultView;
    },
});
