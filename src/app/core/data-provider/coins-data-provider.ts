import { Observable } from 'rxjs';
import { Coin } from '../../entities/classes/coin.class';

/** A single point on a price chart: [timestamp(ms), priceUsd]. */
export type ChartPoint = [number, number];

/**
 * Abstraction over a market-data source. Components depend on this interface,
 * not on a concrete API, so the provider can be swapped without touching
 * feature code (see data-provider.token.ts for the DI binding).
 */
export interface CoinsDataProvider {
    getAssets(limit?: number, offset?: number): Observable<Coin[]>;
    getAsset(id: string): Observable<Coin>;
    getHistory(id: string, interval: string, days: number): Observable<ChartPoint[]>;
}
