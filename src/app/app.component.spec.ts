import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it } from 'vitest';
import { COINS_DATA_PROVIDER } from './core/data-provider/data-provider.token';
import { CoinsInBriefcaseService } from './entities/services/coins-in-briefcase.service';
import { CoinsService } from './entities/services/coins.service';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [AppComponent],
            providers: [
                provideRouter([]),
                { provide: COINS_DATA_PROVIDER, useValue: { getAssets: () => of([]) } },
                CoinsService,
                CoinsInBriefcaseService,
            ],
        });
    });

    it('creates the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        expect(fixture.componentInstance).toBeTruthy();
    });

    it('has the CoinCapMarker title', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        expect(fixture.componentInstance.title).toEqual('CoinCapMarker');
    });
});
