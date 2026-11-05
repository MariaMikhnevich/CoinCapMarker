import type { Routes } from '@angular/router';
import { CoinsTableComponent } from './coins-table/coins-table.component';
import { ErrorComponent } from './error/error.component';
import { InformationAboutCoinComponent } from './information-about-coin/information-about-coin.component';

export const APP_ROUTES: Routes = [
    // { path: '', redirectTo: '/today', pathMatch: 'full' },
    { path: '', component: CoinsTableComponent },
    { path: 'coins/:id', component: InformationAboutCoinComponent },
    { path: '**', component: ErrorComponent },
];
