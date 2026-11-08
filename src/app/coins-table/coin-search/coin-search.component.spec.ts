import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CoinSearchComponent } from './coin-search.component';

describe('CoinSearchComponent', () => {
    let fixture: ComponentFixture<CoinSearchComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CoinSearchComponent],
        });
        fixture = TestBed.createComponent(CoinSearchComponent);
        fixture.detectChanges();
    });

    it('creates', () => {
        expect(fixture.componentInstance).toBeTruthy();
    });

    it('emits the typed text once the debounce settles', async () => {
        const emitted: string[] = [];
        fixture.componentInstance.searchChanged.subscribe((value) => emitted.push(value));

        const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
        input.value = 'bit';
        input.dispatchEvent(new Event('input'));

        await vi.waitFor(() => expect(emitted).toEqual(['bit']));
    });

    it('debounces rapid keystrokes into one emission', async () => {
        const emitted: string[] = [];
        fixture.componentInstance.searchChanged.subscribe((value) => emitted.push(value));

        const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
        ['b', 'bi', 'bit'].forEach((value) => {
            input.value = value;
            input.dispatchEvent(new Event('input'));
        });

        await vi.waitFor(() => expect(emitted).toEqual(['bit']));
    });
});
