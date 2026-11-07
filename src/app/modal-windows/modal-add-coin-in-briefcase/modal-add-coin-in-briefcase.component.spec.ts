import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it } from 'vitest';
import { COINS_DATA_PROVIDER } from '../../core/data-provider/data-provider.token';
import { Coin } from '../../entities/classes/coin.class';
import { CoinsInBriefcaseService } from '../../entities/services/coins-in-briefcase.service';
import { CoinsService } from '../../entities/services/coins.service';
import { ModalAddCoinInBriefcaseComponent } from './modal-add-coin-in-briefcase.component';

const makeCoin = () => new Coin('bitcoin', '1', '', 'BTC', 'Bitcoin', '50000', '1000', '1');

describe('ModalAddCoinInBriefcaseComponent', () => {
    let component: ModalAddCoinInBriefcaseComponent;
    let fixture: ComponentFixture<ModalAddCoinInBriefcaseComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ModalAddCoinInBriefcaseComponent],
            providers: [
                { provide: COINS_DATA_PROVIDER, useValue: { getAssets: () => of([]) } },
                CoinsService,
                CoinsInBriefcaseService,
            ],
        });
        fixture = TestBed.createComponent(ModalAddCoinInBriefcaseComponent);
        fixture.componentRef.setInput('coin', makeCoin());
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('creates and derives the minimum quantity from the coin price', () => {
        expect(component).toBeTruthy();
        expect(component.minQuantity).toBe(1);
        expect(component.totalPrice).toBe(50000);
    });
});
