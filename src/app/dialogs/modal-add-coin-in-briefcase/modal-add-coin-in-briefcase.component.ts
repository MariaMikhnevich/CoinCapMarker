import { Component, DestroyRef, type OnInit, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { Coin } from 'src/app/entities/classes/coin.class';
import { CoinsInBriefcaseService } from 'src/app/entities/services/coins-in-briefcase.service';

@Component({
    selector: 'modal-add-coin-in-briefcase',
    templateUrl: './modal-add-coin-in-briefcase.component.html',
    styleUrl: './modal-add-coin-in-briefcase.component.scss',
    imports: [CurrencyPipe, MatDialogClose, ReactiveFormsModule],
})
export class ModalAddCoinInBriefcaseComponent implements OnInit {
    protected readonly coin = inject<Coin>(MAT_DIALOG_DATA);
    protected readonly quantityControl = new FormControl(1, { nonNullable: true });

    private readonly dialogRef = inject(MatDialogRef<ModalAddCoinInBriefcaseComponent>);
    private readonly coinsInBriefcaseService = inject(CoinsInBriefcaseService);

    protected minQuantity: number = 1;
    protected totalPrice: number = 0;

    constructor() {
        this.quantityControl.valueChanges
            .pipe(takeUntilDestroyed(inject(DestroyRef)))
            .subscribe(() => this.recalculateTotalPrice());
    }

    public ngOnInit(): void {
        this.minQuantity = Math.ceil(1 / +this.coin.priceUsd);
        this.quantityControl.setValue(this.minQuantity);
    }

    protected addInBriefcase() {
        this.coinsInBriefcaseService.addCoin(this.coin, this.quantityControl.value);
        this.dialogRef.close();
    }

    private recalculateTotalPrice() {
        if (this.quantityControl.value < 1) {
            this.quantityControl.setValue(1, { emitEvent: false });
        }
        this.totalPrice = this.quantityControl.value * +this.coin.priceUsd;
    }
}
