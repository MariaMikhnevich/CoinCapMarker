import { Component, type OnInit, inject, input } from '@angular/core';
import type { CoinInBriefcase } from 'src/app/entities/classes/coin-in-briefcase.class';
import { CoinsInBriefcaseService } from 'src/app/entities/services/coins-in-briefcase.service';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
    selector: 'modal-briefcase',
    templateUrl: './modal-briefcase.component.html',
    styleUrl: './modal-briefcase.component.scss',
    imports: [CurrencyPipe, DatePipe],
})
export class ModalBriefcaseComponent implements OnInit {
    public readonly briefcase = input.required<CoinInBriefcase[]>();

    private readonly coinsInBriefcaseService = inject(CoinsInBriefcaseService);

    public ngOnInit(): void {
        this.briefcase().forEach((coinInBriefcase: CoinInBriefcase) => {
            coinInBriefcase.isHidden = true;
        });
    }

    protected deleteCoinFromBriefcase(coinInBriefcase: CoinInBriefcase) {
        this.coinsInBriefcaseService.removeCoin(coinInBriefcase);
        // this.briefcase = this.coinsInBriefcaseService.getBriefcase; - ?? need check, mb move to service
    }

    protected getCurrentPrice(id: string): string {
        return this.coinsInBriefcaseService.getCurrentCoinPrice(id);
    }
}
