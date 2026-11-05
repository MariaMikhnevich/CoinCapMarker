import { NO_ERRORS_SCHEMA } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { COINS_DATA_PROVIDER } from '../core/data-provider/data-provider.token';
import type { Coin } from '../entities/classes/coin.class';
import { CoinInfoService } from '../entities/services/coin-info.service';
import { InformationAboutCoinComponent } from './information-about-coin.component';

describe('InformationAboutCoinComponent', () => {
    let component: InformationAboutCoinComponent;
    let fixture: ComponentFixture<InformationAboutCoinComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, InformationAboutCoinComponent],
            providers: [
                {
                    provide: COINS_DATA_PROVIDER,
                    useValue: {
                        getAssets: () => of([]),
                        getAsset: () => of({} as Coin),
                        getHistory: () => of([]),
                    },
                },
                CoinInfoService,
            ],
            schemas: [NO_ERRORS_SCHEMA],
        });
        fixture = TestBed.createComponent(InformationAboutCoinComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
