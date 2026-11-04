import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { COINS_DATA_PROVIDER } from '../../core/data-provider/data-provider.token';

@Injectable()
export class ChartService {
    private readonly provider = inject(COINS_DATA_PROVIDER);

    getChart(id: string, interval: string, days: number): Observable<number[][]> {
        return this.provider.getHistory(id, interval, days);
    }
}
