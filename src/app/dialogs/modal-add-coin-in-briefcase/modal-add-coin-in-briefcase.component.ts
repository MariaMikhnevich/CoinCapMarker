import { Component, type OnInit, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import type { Coin } from 'src/app/entities/classes/coin.class';
import { CoinsInBriefcaseService } from 'src/app/entities/services/coins-in-briefcase.service';

@Component({
    selector: 'modal-add-coin-in-briefcase',
    templateUrl: './modal-add-coin-in-briefcase.component.html',
    styleUrl: './modal-add-coin-in-briefcase.component.scss',
    imports: [CurrencyPipe, MatDialogClose],
})
export class ModalAddCoinInBriefcaseComponent implements OnInit {
    protected readonly coin = inject<Coin>(MAT_DIALOG_DATA);

    private readonly dialogRef = inject(MatDialogRef<ModalAddCoinInBriefcaseComponent>);
    private readonly coinsInBriefcaseService = inject(CoinsInBriefcaseService);

    public totalPrice: number = 0;
    public quantity: number = 0;
    public minQuantity: number = 1;

    protected onChangeQuantity(event: Event) {
        const input = event.target as HTMLInputElement;
        if (+input.value <= 0) {
            this.quantity = 1;
            input.value = '1';
        } else {
            this.quantity = +input.value;
        }
        this.totalPrice = this.quantity * +this.coin.priceUsd;
    }

    protected addInBriefcase() {
        this.coinsInBriefcaseService.addCoin(this.coin, this.quantity);
        this.dialogRef.close();
    }

    public ngOnInit(): void {
        this.minQuantity = Math.ceil(1 / +this.coin.priceUsd);
        this.totalPrice = +this.coin.priceUsd * this.minQuantity;
        this.quantity = this.minQuantity;
    }
}
