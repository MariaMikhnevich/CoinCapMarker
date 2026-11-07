import type { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, type OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, take } from 'rxjs';
import { DecimalPipe, CurrencyPipe } from '@angular/common';
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
        ChartComponent,
        DecimalPipe,
        CurrencyPipe,
        RouterLink,
    ],
})
export class InformationAboutCoinComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private coinInfoService = inject(CoinInfoService);

    private readonly coinId = signal<string | null>(null);

    protected readonly coin = signal<Coin | null>(null);
    protected readonly error = signal<HttpErrorResponse | null>(null);

    protected readonly isVisibleModalAddCoin = signal<boolean>(false);
    protected readonly coinTransferredByModal = signal<Coin | null>(null);

    public ngOnInit() {
        this.route.paramMap.pipe(map((params) => params.get('id'))).subscribe((data) => {
            this.coinId.set(data);
            this.error.set(null);
            this.getCionInfo();
        });
    }

    protected errorOccurred(error: HttpErrorResponse) {
        this.error.set(error);
    }

    protected addCoin(event: Event, coin: Coin) {
        event.stopPropagation();
        this.isVisibleModalAddCoin.set(true);
        this.coinTransferredByModal.set(coin);
    }

    protected closeModal() {
        this.isVisibleModalAddCoin.set(false);
        this.coinTransferredByModal.set(null);
    }

    private getCionInfo() {
        const id = this.coinId();
        if (id)
            this.coinInfoService
                .getCoinInfo(id)
                .pipe(take(1))
                .subscribe({
                    next: (data: Coin) => {
                        this.coin.set(data);
                    },
                    error: (error: HttpErrorResponse) => {
                        this.error.set(error);
                    },
                });
    }
}
