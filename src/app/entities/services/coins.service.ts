import { Injectable, inject } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { Coin } from '../classes/coin.class';
import { COINS_DATA_PROVIDER } from '../../core/data-provider/data-provider.token';

const ASSETS_PAGE_SIZE = 2000;
const CACHE_TTL_MS = 60_000;

@Injectable()
export class CoinsService {
    private readonly provider = inject(COINS_DATA_PROVIDER);

    private assets$: Observable<Coin[]> | null = null;

    private assetsFetchedAt = 0;

    /**
     * Full list of coins from a single shared request. Consumers within the
     * TTL window receive the same response (each its own copy of the array),
     * which keeps the app well inside the API rate limits.
     */
    getAssets(): Observable<Coin[]> {
        if (!this.assets$ || Date.now() - this.assetsFetchedAt > CACHE_TTL_MS) {
            this.assetsFetchedAt = Date.now();
            this.assets$ = this.provider
                .getAssets(ASSETS_PAGE_SIZE)
                .pipe(shareReplay({ bufferSize: 1, refCount: false }));
        }
        return this.assets$.pipe(map((coins) => [...coins]));
    }

    getTopCoins(count: number): Observable<Coin[]> {
        return this.getAssets().pipe(map((coins) => coins.slice(0, count)));
    }

    getCoinsWithoutEmptyLines(coin: Coin): boolean {
        if (!coin.priceUsd || !+(+coin.priceUsd).toFixed(2)) return false;
        if (!coin.marketCapUsd || !+(+coin.marketCapUsd).toFixed(2)) return false;
        if (!coin.changePercent24Hr || !+(+coin.changePercent24Hr).toFixed(2)) return false;
        return true;
    }
}
