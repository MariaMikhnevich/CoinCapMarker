import { Injectable, inject } from '@angular/core';
import type { Observable } from 'rxjs';
import type { Coin } from '../classes/coin.class';
import { COINS_DATA_PROVIDER } from '../../core/data-provider/data-provider.token';

@Injectable()
export class CoinInfoService {
    private readonly provider = inject(COINS_DATA_PROVIDER);

    public getCoinInfo(id: string): Observable<Coin> {
        return this.provider.getAsset(id);
    }
}
