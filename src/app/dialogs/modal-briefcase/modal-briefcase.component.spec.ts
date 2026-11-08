import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it } from 'vitest';
import { COINS_DATA_PROVIDER } from '../../core/data-provider/data-provider.token';
import { Coin } from '../../entities/classes/coin.class';
import { CoinsInBriefcaseService } from '../../entities/services/coins-in-briefcase.service';
import { CoinsService } from '../../entities/services/coins.service';
import { ModalBriefcaseComponent } from './modal-briefcase.component';

const makeCoin = () => new Coin('bitcoin', '1', 'logo.png', 'BTC', 'Bitcoin', '50000', '1000', '1');

describe('ModalBriefcaseComponent', () => {
    let fixture: ComponentFixture<ModalBriefcaseComponent>;
    let briefcaseService: CoinsInBriefcaseService;

    beforeEach(() => {
        localStorage.clear();
        TestBed.configureTestingModule({
            imports: [ModalBriefcaseComponent],
            providers: [
                { provide: COINS_DATA_PROVIDER, useValue: { getAssets: () => of([]) } },
                CoinsService,
                CoinsInBriefcaseService,
            ],
        });
        briefcaseService = TestBed.inject(CoinsInBriefcaseService);
        fixture = TestBed.createComponent(ModalBriefcaseComponent);
    });

    it('creates with its title', () => {
        fixture.detectChanges();
        expect(fixture.componentInstance).toBeTruthy();
        expect(fixture.nativeElement.querySelector('.app-dialog-title')?.textContent?.trim()).toBe(
            'Your Briefcase',
        );
    });

    it('renders the entries stored in the service', () => {
        briefcaseService.addCoin(makeCoin(), 2);
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelectorAll('.coin-in-briefcase').length).toBe(1);
        expect(fixture.nativeElement.querySelector('.name')?.textContent?.trim()).toBe('Bitcoin');
    });

    it('removes the entry when Delete is clicked', () => {
        briefcaseService.addCoin(makeCoin(), 2);
        fixture.detectChanges();
        (fixture.nativeElement.querySelector('button.delete') as HTMLButtonElement).click();
        fixture.detectChanges();
        expect(briefcaseService.briefcase().length).toBe(0);
        expect(fixture.nativeElement.querySelector('.coin-in-briefcase')).toBeNull();
    });
});
