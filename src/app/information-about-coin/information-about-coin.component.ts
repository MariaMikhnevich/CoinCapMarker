import type { HttpErrorResponse } from '@angular/common/http';
import { Component, type OnDestroy, inject, type OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { type Subscription, switchMap } from 'rxjs';
import { NgClass, DecimalPipe, CurrencyPipe } from '@angular/common';
import type { Coin } from '../entities/classes/coin.class';
import { CoinInfoService } from '../entities/services/coin-info.service';
import { ErrorComponent } from '../error/error.component';
import { ModalWindowsComponent } from '../modal-windows/modal-windows.component';
import { ChartComponent } from './chart/chart.component';

@Component({
    selector: 'app-information-about-coin',
    templateUrl: './information-about-coin.component.html',
    styleUrl: './information-about-coin.component.scss',
    imports: [
        ErrorComponent,
        ModalWindowsComponent,
        NgClass,
        ChartComponent,
        DecimalPipe,
        CurrencyPipe,
    ],
})
export class InformationAboutCoinComponent implements OnDestroy, OnInit {
    private route = inject(ActivatedRoute);

    private coinInfoService = inject(CoinInfoService);

    id!: string;

    public coin!: Coin;

    public error: HttpErrorResponse | null = null;

    private subscription!: Subscription;

    isVisibleModalAddCoin: boolean = false;

    coinTransferredByModal: Coin | null = null;

    ngOnInit() {
        this.route.paramMap.pipe(switchMap((params) => params.getAll('id'))).subscribe((data) => {
            this.id = data;
            this.error = null;
            this.getCionInfo();
        });
    }

    public getCionInfo() {
        this.subscription = this.coinInfoService.getCoinInfo(this.id).subscribe({
            next: (data: Coin) => {
                this.coin = data;
            },
            error: (error: HttpErrorResponse) => {
                this.error = error;
            },
        });
    }

    errorOccurred(error: HttpErrorResponse) {
        this.error = error;
    }

    addCoin(event: Event, coin: Coin) {
        event.stopPropagation();
        this.isVisibleModalAddCoin = true;
        this.coinTransferredByModal = coin;
    }

    closeModal() {
        this.isVisibleModalAddCoin = false;
        this.coinTransferredByModal = null;
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }
}
