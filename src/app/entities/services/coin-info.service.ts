import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Coin } from '../classes/coin.class';
import { COINS_DATA_PROVIDER } from '../../core/data-provider/data-provider.token';

@Injectable()
export class CoinInfoService {
    private readonly provider = inject(COINS_DATA_PROVIDER);

    public getCoinInfo(id: string): Observable<Coin> {
        return this.provider.getAsset(id);
    }
}
