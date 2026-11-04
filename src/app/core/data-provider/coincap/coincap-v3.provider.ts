import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Coin } from '../../../entities/classes/coin.class';
import { ChartPoint, CoinsDataProvider } from '../coins-data-provider';
import {
    CoinCapAssetDto,
    CoinCapAssetsResponse,
    CoinCapAssetResponse,
    CoinCapHistoryResponse,
} from './coincap-dto';

const ICON_URL_BASE = 'https://assets.coincap.io/assets/icons';

/** CoinCap implementation of the market-data source (https://rest.coincap.io/v3). */
@Injectable()
export class CoinCapV3Provider implements CoinsDataProvider {
    private readonly http = inject(HttpClient);

    private readonly apiUrl = environment.coincap.apiUrl;

    getAssets(limit?: number, offset?: number): Observable<Coin[]> {
        let params = this.authParams();
        if (limit != null) params = params.set('limit', limit);
        if (offset != null) params = params.set('offset', offset);

        return this.http
            .get<CoinCapAssetsResponse>(`${this.apiUrl}/assets`, { params })
            .pipe(map(({ data }) => data.map((asset) => this.toCoin(asset))));
    }

    getAsset(id: string): Observable<Coin> {
        return this.http
            .get<CoinCapAssetResponse>(`${this.apiUrl}/assets/${id}`, { params: this.authParams() })
            .pipe(map(({ data }) => this.toCoin(data)));
    }

    getHistory(id: string, interval: string, days: number): Observable<ChartPoint[]> {
        const end = Date.now();
        const start = end - 1000 * 60 * 60 * 24 * days;
        const params = this.authParams()
            .set('interval', interval)
            .set('start', start)
            .set('end', end);

        return this.http
            .get<CoinCapHistoryResponse>(`${this.apiUrl}/assets/${id}/history`, { params })
            .pipe(
                map(({ data }) =>
                    data.map((point) => [
                        this.toChartTime(point.time),
                        this.toChartPrice(+point.priceUsd),
                    ]),
                ),
            );
    }

    private authParams(): HttpParams {
        return new HttpParams().set('apiKey', environment.coincap.apiKey);
    }

    private toCoin(dto: CoinCapAssetDto): Coin {
        return new Coin(
            dto.id,
            dto.rank,
            `${ICON_URL_BASE}/${dto.symbol.toLowerCase()}@2x.png`,
            dto.symbol,
            dto.name,
            dto.priceUsd,
            dto.marketCapUsd,
            dto.changePercent24Hr,
            dto.supply ?? '',
            dto.maxSupply ?? '',
        );
    }

    private toChartTime(time: number): number {
        return Math.floor(+time / 1000) * 1000 + -new Date(time).getTimezoneOffset() * 60 * 1000;
    }

    private toChartPrice(price: number): number {
        if (price < 0.1) {
            return +price.toFixed(5);
        }
        if (price < 10) {
            return +price.toFixed(4);
        }
        return +price.toFixed(2);
    }
}
