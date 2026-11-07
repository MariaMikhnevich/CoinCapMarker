import { type ApplicationConfig, importProvidersFrom } from '@angular/core';

import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { provideHighcharts } from 'highcharts-angular';
import { COINS_DATA_PROVIDER } from './core/data-provider/data-provider.token';
import { CoinCapV3Provider } from './core/data-provider/coincap/coincap-v3.provider';
import { CoinGeckoProvider } from './core/data-provider/coingecko/coingecko.provider';
import { FallbackCoinsDataProvider } from './core/data-provider/fallback/fallback.provider';
import { CoinsService } from './entities/services/coins.service';
import { CoinInfoService } from './entities/services/coin-info.service';
import { ChartService } from './entities/services/chart.service';
import { VisualChartsService } from './entities/services/visual-charts.service';
import { CoinsInBriefcaseService } from './entities/services/coins-in-briefcase.service';
import { LoadingInterceptor } from './entities/interceptors/loading.interceptor';
import { APP_ROUTES } from './app-routing.constant';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(
            APP_ROUTES,
            withComponentInputBinding(),
            withInMemoryScrolling({
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
            }),
        ),
        importProvidersFrom(NgxPaginationModule, BrowserModule, MatProgressSpinnerModule),
        // Supplies the HIGHCHARTS_LOADER token that HighchartsChartService
        // requires; without it the chart component cannot be created at all.
        provideHighcharts(),
        CoinCapV3Provider,
        CoinGeckoProvider,
        { provide: COINS_DATA_PROVIDER, useClass: FallbackCoinsDataProvider },
        CoinsService,
        CoinInfoService,
        ChartService,
        VisualChartsService,
        CoinsInBriefcaseService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoadingInterceptor,
            multi: true,
        },
        provideHttpClient(withInterceptorsFromDi()),
    ],
};
