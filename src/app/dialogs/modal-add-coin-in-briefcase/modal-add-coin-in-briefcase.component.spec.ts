import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { COINS_DATA_PROVIDER } from '../../core/data-provider/data-provider.token';
import { Coin } from '../../entities/classes/coin.class';
import { CoinsInBriefcaseService } from '../../entities/services/coins-in-briefcase.service';
import { CoinsService } from '../../entities/services/coins.service';
import { ModalAddCoinInBriefcaseComponent } from './modal-add-coin-in-briefcase.component';

const makeCoin = () => new Coin('bitcoin', '1', '', 'BTC', 'Bitcoin', '50000', '1000', '1');

describe('ModalAddCoinInBriefcaseComponent', () => {
    let component: ModalAddCoinInBriefcaseComponent;
    let fixture: ComponentFixture<ModalAddCoinInBriefcaseComponent>;
    let close: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        close = vi.fn();
        TestBed.configureTestingModule({
            imports: [ModalAddCoinInBriefcaseComponent],
            providers: [
                { provide: COINS_DATA_PROVIDER, useValue: { getAssets: () => of([]) } },
                CoinsService,
                CoinsInBriefcaseService,
                { provide: MAT_DIALOG_DATA, useValue: makeCoin() },
                { provide: MatDialogRef, useValue: { close } },
            ],
        });
        fixture = TestBed.createComponent(ModalAddCoinInBriefcaseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('creates and derives the minimum quantity from the coin price', () => {
        expect(component).toBeTruthy();
        expect(component.minQuantity).toBe(1);
        expect(component.totalPrice).toBe(50000);
    });

    it('closes itself through the mat-dialog-close button', () => {
        (fixture.nativeElement.querySelector('button.app-dialog-close') as HTMLButtonElement).click();
        expect(close).toHaveBeenCalled();
    });
});
