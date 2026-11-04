import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { COINS_DATA_PROVIDER } from '../../core/data-provider/data-provider.token';
import { Coin } from '../../entities/classes/coin.class';
import { CoinsInBriefcaseService } from '../../entities/services/coins-in-briefcase.service';
import { CoinsService } from '../../entities/services/coins.service';
import { ModalAddCoinInBriefcaseComponent } from './modal-add-coin-in-briefcase.component';

describe('ModalAddCoinInBriefcaseComponent', () => {
    let component: ModalAddCoinInBriefcaseComponent;
    let fixture: ComponentFixture<ModalAddCoinInBriefcaseComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ModalAddCoinInBriefcaseComponent],
            providers: [
                {
                    provide: COINS_DATA_PROVIDER,
                    useValue: {
                        getAssets: () => of([]),
                        getAsset: () => of({} as Coin),
                        getHistory: () => of([]),
                    },
                },
                CoinsService,
                CoinsInBriefcaseService,
            ],
            schemas: [NO_ERRORS_SCHEMA],
        });
        fixture = TestBed.createComponent(ModalAddCoinInBriefcaseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
