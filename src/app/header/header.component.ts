import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DecimalPipe, PercentPipe, CurrencyPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import type { Coin } from '../entities/classes/coin.class';
import { CoinsInBriefcaseService } from '../entities/services/coins-in-briefcase.service';
import { CoinsService } from '../entities/services/coins.service';
import { SelectedCoinService } from '../entities/services/selected-coin.service';
import { ModalBriefcaseComponent } from '../dialogs/modal-briefcase/modal-briefcase.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    imports: [DecimalPipe, PercentPipe, CurrencyPipe],
})
export class HeaderComponent {
    private readonly coinsService = inject(CoinsService);
    private readonly selectedCoinService = inject(SelectedCoinService);
    private readonly router = inject(Router);
    private readonly coinsInBriefcaseService = inject(CoinsInBriefcaseService);
    private readonly dialog = inject(MatDialog);

    protected readonly topCoins = toSignal(this.coinsService.getTopCoins(3), {
        initialValue: [] as Coin[],
    });

    protected readonly briefcaseValue = toSignal(this.coinsInBriefcaseService.briefcaseValue$, {
        initialValue: 0,
    });

    protected readonly differenceValue = toSignal(
        this.coinsInBriefcaseService.differenceInValueOfCoins$,
        { initialValue: 0 },
    );

    protected readonly percentageDifferenceValue = toSignal(
        this.coinsInBriefcaseService.percentageDifferenceInValueOfCoins$,
        { initialValue: 0 },
    );

    protected moreDetailed(coin: Coin) {
        this.selectedCoinService.select(coin);
        this.router.navigate([`/coins/${coin.id}`]);
    }

    protected openBriefcase() {
        this.dialog.open(ModalBriefcaseComponent, { panelClass: 'app-dialog-panel' });
    }
}
