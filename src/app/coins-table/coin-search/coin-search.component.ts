import { Component, DestroyRef, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import type { Coin } from 'src/app/entities/classes/coin.class';

@Component({
    selector: 'coin-search',
    templateUrl: './coin-search.component.html',
    styleUrl: './coin-search.component.scss',
    imports: [ReactiveFormsModule],
})
export class CoinSearchComponent {
    public readonly allCoins = input<Coin[]>([]);

    public readonly desiredCoinChanged = output<{ coins: Coin[]; value: string }>();

    protected readonly searchControl = new FormControl('', { nonNullable: true });

    constructor() {
        this.searchControl.valueChanges
            .pipe(takeUntilDestroyed(inject(DestroyRef)))
            .subscribe((value) => this.emitFiltered(value));
    }

    private emitFiltered(value: string) {
        this.desiredCoinChanged.emit({
            coins: this.allCoins().filter((coin) =>
                coin.name.toLowerCase().includes(value.toLowerCase()),
            ),
            value,
        });
    }
}
