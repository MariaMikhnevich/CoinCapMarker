import { InjectionToken } from '@angular/core';
import type { CoinsDataProvider } from './coins-data-provider';

/**
 * Binds the app-wide data source to a concrete implementation.
 * Swap the provider here (e.g. to a CoinGecko implementation) and no
 * feature code has to change.
 */
export const COINS_DATA_PROVIDER = new InjectionToken<CoinsDataProvider>('CoinsDataProvider');
