import { Component, type OnInit, inject } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import type { CoinInBriefcase } from 'src/app/entities/classes/coin-in-briefcase.class';
import { CoinsInBriefcaseService } from 'src/app/entities/services/coins-in-briefcase.service';

@Component({
    selector: 'modal-briefcase',
    templateUrl: './modal-briefcase.component.html',
    styleUrl: './modal-briefcase.component.scss',
    imports: [CurrencyPipe, DatePipe],
})
export class ModalBriefcaseComponent implements OnInit {
    private readonly coinsInBriefcaseService = inject(CoinsInBriefcaseService);

    protected readonly briefcase = this.coinsInBriefcaseService.briefcase;

    public ngOnInit(): void {
        this.briefcase().forEach((coinInBriefcase: CoinInBriefcase) => {
            coinInBriefcase.isHidden = true;
        });
    }

    protected deleteCoinFromBriefcase(coinInBriefcase: CoinInBriefcase) {
        this.coinsInBriefcaseService.removeCoin(coinInBriefcase);
    }

    protected getCurrentPrice(id: string): string {
        return this.coinsInBriefcaseService.getCurrentCoinPrice(id);
    }
}
