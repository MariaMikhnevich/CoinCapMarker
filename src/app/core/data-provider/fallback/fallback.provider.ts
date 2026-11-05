import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, type Observable } from 'rxjs';
import type { Coin } from '../../../entities/classes/coin.class';
import { CoinCapV3Provider } from '../coincap/coincap-v3.provider';
import { CoinGeckoProvider } from '../coingecko/coingecko.provider';
import type { ChartPoint, CoinsDataProvider } from '../coins-data-provider';

/** How long the primary provider is skipped after a quota/availability failure. */
const FALLBACK_COOLDOWN_MS = 10 * 60 * 1000;

/**
 * Tries the primary provider (CoinCap) and transparently switches to the
 * fallback (CoinGecko) when it fails — e.g. when the CoinCap monthly quota
 * is exhausted. After a quota/availability error the fallback serves all
 * requests directly for the cooldown window, so consumers don't pay a
 * failed request on every call.
 */
@Injectable()
export class FallbackCoinsDataProvider implements CoinsDataProvider {
    private readonly primary = inject(CoinCapV3Provider);
    private readonly secondary = inject(CoinGeckoProvider);
    private useFallbackUntil = 0;

    getAssets(limit?: number, offset?: number): Observable<Coin[]> {
        return this.withFallback(
            this.primary.getAssets(limit, offset),
            () => this.secondary.getAssets(limit, offset),
        );
    }

    getAsset(id: string): Observable<Coin> {
        return this.withFallback(
            this.primary.getAsset(id),
            () => this.secondary.getAsset(id),
        );
    }

    getHistory(id: string, interval: string, days: number): Observable<ChartPoint[]> {
        return this.withFallback(
            this.primary.getHistory(id, interval, days),
            () => this.secondary.getHistory(id, interval, days),
        );
    }

    private withFallback<T>(primary$: Observable<T>, fallback: () => Observable<T>): Observable<T> {
        if (Date.now() < this.useFallbackUntil) {
            return fallback();
        }
        return primary$.pipe(
            catchError(err => {
                if (this.shouldSkipPrimary(err)) {
                    this.useFallbackUntil = Date.now() + FALLBACK_COOLDOWN_MS;
                }
                return fallback();
            }),
        );
    }

    /** Quota exhaustion, auth problems, network and server errors — not "coin not found". */
    private shouldSkipPrimary(err: unknown): boolean {
        const status = err instanceof HttpErrorResponse ? err.status : 0;
        return status === 0 || status === 401 || status === 403 || status === 429 || status >= 500;
    }
}
