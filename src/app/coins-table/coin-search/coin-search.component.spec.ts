import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Coin } from '../../entities/classes/coin.class';
import { CoinSearchComponent } from './coin-search.component';

describe('CoinSearchComponent', () => {
    let fixture: ComponentFixture<CoinSearchComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CoinSearchComponent],
        });
        fixture = TestBed.createComponent(CoinSearchComponent);
        fixture.componentRef.setInput('allCoins', [
            new Coin('bitcoin', '1', '', 'BTC', 'Bitcoin', '50000', '1000', '1'),
            new Coin('ethereum', '2', '', 'ETH', 'Ethereum', '3000', '1000', '1'),
        ]);
        fixture.detectChanges();
    });

    it('creates', () => {
        expect(fixture.componentInstance).toBeTruthy();
    });

    it('emits the coins matching the typed text', async () => {
        const emitted: { coins: Coin[]; value: string }[] = [];
        fixture.componentInstance.desiredCoinChanged.subscribe((event) => emitted.push(event));

        const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
        input.value = 'bit';
        input.dispatchEvent(new Event('input'));

        await vi.waitFor(() => expect(emitted.length).toBe(1));
        expect(emitted[0].value).toBe('bit');
        expect(emitted[0].coins.map((coin) => coin.id)).toEqual(['bitcoin']);
    });

    it('debounces rapid keystrokes into one emission', async () => {
        const emitted: { coins: Coin[]; value: string }[] = [];
        fixture.componentInstance.desiredCoinChanged.subscribe((event) => emitted.push(event));

        const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
        ['b', 'bi', 'bit'].forEach((value) => {
            input.value = value;
            input.dispatchEvent(new Event('input'));
        });

        await vi.waitFor(() => expect(emitted.length).toBe(1));
        expect(emitted[0].value).toBe('bit');
    });
});
