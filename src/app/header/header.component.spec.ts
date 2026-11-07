import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { COINS_DATA_PROVIDER } from '../core/data-provider/data-provider.token';
import { Coin } from '../entities/classes/coin.class';
import { CoinsInBriefcaseService } from '../entities/services/coins-in-briefcase.service';
import { CoinsService } from '../entities/services/coins.service';
import { HeaderComponent } from './header.component';

const makeCoin = (id: string) =>
    new Coin(id, '1', 'logo.png', id.toUpperCase(), id, '50000', '1000', '1');

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let getAssets: ReturnType<typeof vi.fn>;

    function create() {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }

    beforeEach(() => {
        localStorage.clear();
        getAssets = vi.fn().mockReturnValue(of([]));
        TestBed.configureTestingModule({
            imports: [HeaderComponent],
            providers: [
                provideRouter([]),
                { provide: COINS_DATA_PROVIDER, useValue: { getAssets } },
                CoinsService,
                CoinsInBriefcaseService,
            ],
        });
    });

    it('creates', () => {
        create();
        expect(component).toBeTruthy();
    });

    it('renders at most three top coins', () => {
        getAssets.mockReturnValue(
            of([makeCoin('bitcoin'), makeCoin('ethereum'), makeCoin('solana'), makeCoin('doge')]),
        );
        create();
        expect(fixture.nativeElement.querySelectorAll('.top3 > div').length).toBe(3);
    });

    it('opens the briefcase dialog on briefcase click', () => {
        create();
        expect(fixture.nativeElement.querySelector('.visible-briefcase')).toBeNull();

        (fixture.nativeElement.querySelector('.briefcase') as HTMLElement).click();
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.visible-briefcase')).not.toBeNull();
    });
});
