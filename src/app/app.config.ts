import { type ApplicationConfig, importProvidersFrom } from '@angular/core';

import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { COINS_DATA_PROVIDER } from './core/data-provider/data-provider.token';
import { CoinCapV3Provider } from './core/data-provider/coincap/coincap-v3.provider';
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
        { provide: COINS_DATA_PROVIDER, useClass: CoinCapV3Provider },
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
