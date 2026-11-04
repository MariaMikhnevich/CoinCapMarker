import { Component, HostListener, OnDestroy, OnInit, DOCUMENT, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CoinsService } from '../entities/services/coins.service';
import { Coin } from '../entities/classes/coin.class';

@Component({
    selector: 'coins-table',
    templateUrl: './coins-table.component.html',
    styleUrls: ['./coins-table.component.scss'],
    standalone: false,
})
export class CoinsTableComponent implements OnInit, OnDestroy {
    private coinsService = inject(CoinsService);

    private router = inject(Router);

    private document = inject<Document>(DOCUMENT);

    allCoins: Coin[] = [];

    displayedCoins: Coin[] = [];

    private sortCount = [0, 0, 0, 0];

    page: number = 1;

    count: number = 0;

    tableSize: number = 100;

    tableSizes: any = [100, 200];

    isVisibleModalAddCoin: boolean = false;

    coinTransferredByModal: Coin | null = null;

    error!: HttpErrorResponse;

    private subscription!: Subscription;

    windowScrolled!: boolean;

    searchMode: boolean = false;

    ngOnInit() {
        this.loadCoins();
    }

    // one shared request; pagination, search and sorting then work client-side
    loadCoins() {
        this.subscription = this.coinsService.getAssets().subscribe({
            next: (data: Coin[]) => {
                this.allCoins = data.filter((coin) =>
                    this.coinsService.getCoinsWithoutEmptyLines(coin),
                );
                this.count = this.allCoins.length;
                this.displayedCoins = this.allCoins;
            },
            error: (error: HttpErrorResponse) => {
                this.error = error;
            },
        });
    }

    onTableDataChange(e: number) {
        this.page = e;
    }

    changeTableSize(event: Event) {
        this.tableSize = +(event.target as HTMLSelectElement).value;
        this.page = 1;
    }

    public sort(index: number) {
        let key: string;
        switch (index) {
            case 1:
                key = 'priceUsd';
                break;
            case 2:
                key = 'changePercent24Hr';
                break;
            case 3:
                key = 'marketCapUsd';
                break;
            default:
                break;
        }
        if (this.sortCount[index] === 0 || this.sortCount[index] === 1) {
            this.displayedCoins?.sort((a, b) => +(b as any)[key] - +(a as any)[key]);
            this.sortCount[index] = -1;
        } else {
            this.displayedCoins?.sort((a, b) => +(a as any)[key] - +(b as any)[key]);
            this.sortCount[index] = 1;
        }
    }

    moreDetailed(id: string) {
        this.router.navigate([`/coins/${id}`]);
    }

    coinsChange(event: { coins: Coin[]; value: string }) {
        if (event.value !== '') {
            this.displayedCoins = event.coins;
            this.searchMode = true;
        } else {
            this.displayedCoins = this.allCoins;
            this.page = 1;
            this.searchMode = false;
        }
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

    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        if (
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop > 100
        ) {
            this.windowScrolled = true;
        } else if (
            (this.windowScrolled && window.pageYOffset) ||
            document.documentElement.scrollTop ||
            document.body.scrollTop < 10
        ) {
            this.windowScrolled = false;
        }
    }

    scrollToTop() {
        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
            window.scrollTo(0, 0);
        }
    }
}
