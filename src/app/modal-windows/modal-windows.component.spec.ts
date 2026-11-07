import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it } from 'vitest';
import { COINS_DATA_PROVIDER } from '../core/data-provider/data-provider.token';
import { Coin } from '../entities/classes/coin.class';
import { CoinsInBriefcaseService } from '../entities/services/coins-in-briefcase.service';
import { CoinsService } from '../entities/services/coins.service';
import { ModalWindowsComponent } from './modal-windows.component';

describe('ModalWindowsComponent', () => {
    let fixture: ComponentFixture<ModalWindowsComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ModalWindowsComponent],
            providers: [
                { provide: COINS_DATA_PROVIDER, useValue: { getAssets: () => of([]) } },
                CoinsService,
                CoinsInBriefcaseService,
            ],
        });
        fixture = TestBed.createComponent(ModalWindowsComponent);
        fixture.detectChanges();
    });

    it('creates hidden', () => {
        expect(fixture.componentInstance).toBeTruthy();
        expect(fixture.nativeElement.querySelector('.visible-briefcase')).toBeNull();
    });

    it('shows the Add Coin dialog when opened with a coin', () => {
        fixture.componentRef.setInput('isVisible', true);
        fixture.componentRef.setInput(
            'coin',
            new Coin('bitcoin', '1', '', 'BTC', 'Bitcoin', '50000', '1000', '1'),
        );
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.modal-title')?.textContent?.trim()).toBe(
            'Add Coin',
        );
    });

    it('shows the briefcase dialog in briefcase mode', () => {
        fixture.componentRef.setInput('isVisible', true);
        fixture.componentRef.setInput('isBriefcase', true);
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.modal-title')?.textContent?.trim()).toBe(
            'Your Briefcase',
        );
        expect(fixture.nativeElement.querySelector('modal-briefcase')).not.toBeNull();
    });
});
