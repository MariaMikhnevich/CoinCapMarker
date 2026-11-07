import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DecimalPipe, PercentPipe, CurrencyPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import type { Coin } from '../entities/classes/coin.class';
import { CoinsInBriefcaseService } from '../entities/services/coins-in-briefcase.service';
import { CoinsService } from '../entities/services/coins.service';
import { SelectedCoinService } from '../entities/services/selected-coin.service';
import { ModalWindowsComponent } from '../modal-windows/modal-windows.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    imports: [ModalWindowsComponent, DecimalPipe, PercentPipe, CurrencyPipe],
})
export class HeaderComponent {
    private readonly coinsService = inject(CoinsService);
    private readonly selectedCoinService = inject(SelectedCoinService);
    private readonly router = inject(Router);
    private readonly coinsInBriefcaseService = inject(CoinsInBriefcaseService);

    public readonly topCoins = toSignal(this.coinsService.getTopCoins(3), {
        initialValue: [] as Coin[],
    });

    public readonly briefcaseValue = toSignal(this.coinsInBriefcaseService.briefcaseValue$, {
        initialValue: 0,
    });

    public readonly differenceValue = toSignal(
        this.coinsInBriefcaseService.differenceInValueOfCoins$,
        { initialValue: 0 },
    );

    public readonly percentageDifferenceValue = toSignal(
        this.coinsInBriefcaseService.percentageDifferenceInValueOfCoins$,
        { initialValue: 0 },
    );

    protected readonly isVisualBriefcase = signal(false);

    moreDetailed(coin: Coin) {
        this.selectedCoinService.select(coin);
        this.router.navigate([`/coins/${coin.id}`]);
    }

    protected openBriefcase() {
        this.isVisualBriefcase.set(true);
    }

    protected closeBriefcase() {
        this.isVisualBriefcase.set(false);
    }
}
