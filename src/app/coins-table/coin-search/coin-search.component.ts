import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Coin } from 'src/app/entities/classes/coin.class';

@Component({
  selector: 'coin-search',
  templateUrl: './coin-search.component.html',
  styleUrls: ['./coin-search.component.scss'],
  standalone: false,
})
export class CoinSearchComponent {
  @Input() allCoins!: Coin[];

  public desiredCoin: string = '';

  @Output() desiredCoinChanged = new EventEmitter<{ coins: Coin[]; value: string }>();

  public searchCoin(event: Event) {
    this.desiredCoin = (event.target as HTMLInputElement).value;
    this.desiredCoinChanged.emit({
      coins: this.allCoins.filter((coin) =>
        coin.name.toLowerCase().includes(this.desiredCoin.toLowerCase()),
      ),
      value: this.desiredCoin,
    });
  }
}
