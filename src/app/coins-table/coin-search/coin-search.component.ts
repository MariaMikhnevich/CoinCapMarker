import { Component, input, output } from '@angular/core';
import type { Coin } from 'src/app/entities/classes/coin.class';

@Component({
    selector: 'coin-search',
    templateUrl: './coin-search.component.html',
    styleUrl: './coin-search.component.scss',
})
export class CoinSearchComponent {
    public readonly allCoins = input<Coin[]>([]);

    public readonly desiredCoinChanged = output<{ coins: Coin[]; value: string }>();

    protected searchCoin(event: Event) {
        const desiredCoin = (event.target as HTMLInputElement).value;
        this.desiredCoinChanged.emit({
            coins: this.allCoins().filter((coin) =>
                coin.name.toLowerCase().includes(desiredCoin.toLowerCase()),
            ),
            value: desiredCoin,
        });
    }
}
