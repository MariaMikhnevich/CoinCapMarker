import { Component, type OnChanges, inject, input, output } from '@angular/core';
import type { Coin } from 'src/app/entities/classes/coin.class';
import { CoinsInBriefcaseService } from 'src/app/entities/services/coins-in-briefcase.service';
import { CurrencyPipe } from '@angular/common';

@Component({
    selector: 'modal-add-coin-in-briefcase',
    templateUrl: './modal-add-coin-in-briefcase.component.html',
    styleUrl: './modal-add-coin-in-briefcase.component.scss',
    imports: [CurrencyPipe],
})
export class ModalAddCoinInBriefcaseComponent implements OnChanges {
    public readonly coin = input.required<Coin>();

    public readonly closed = output<boolean>();

    private readonly coinsInBriefcaseService = inject(CoinsInBriefcaseService);

    public totalPrice: number = 0;
    public quantity: number = 0;
    public minQuantity: number = 1;

    protected close() {
        this.closed.emit(false);
    }

    protected onChangeQuantity(event: Event) {
        if (this.coin) {
            if (+(event.target as HTMLInputElement).value <= 0) {
                this.quantity = 1;
                (event.target as HTMLInputElement).value = '1';
            } else this.quantity = +(event.target as HTMLInputElement).value;
            this.totalPrice = this.quantity * +(this.coin()?.priceUsd ?? 0);
        }
    }

    protected addInBriefcase() {
        const coin = this.coin();
        if (coin) {
            this.coinsInBriefcaseService.addCoin(coin, this.quantity);
        }
        this.close();
    }

    ngOnChanges(): void {
        if (this.coin) {
            this.minQuantity = Math.ceil(1 / +(this.coin()?.priceUsd ?? 0));
            this.totalPrice = +(this.coin()?.priceUsd ?? 0) * this.minQuantity;
            this.quantity = this.minQuantity;
        } else {
            this.totalPrice = 0;
            this.quantity = 0;
        }
    }
}
