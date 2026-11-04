import { Component, Input, OnInit, inject } from '@angular/core';
import { CoinInBriefcase } from 'src/app/entities/classes/coin-in-briefcase.class';
import { CoinsInBriefcaseService } from 'src/app/entities/services/coins-in-briefcase.service';

@Component({
    selector: 'modal-briefcase',
    templateUrl: './modal-briefcase.component.html',
    styleUrls: ['./modal-briefcase.component.scss'],
    standalone: false,
})
export class ModalBriefcaseComponent implements OnInit {
    private coinsInBriefcaseService = inject(CoinsInBriefcaseService);

    @Input() briefcase: CoinInBriefcase[] | null = null;

    ngOnInit(): void {
        this.briefcase?.forEach((coinInBriefcase: CoinInBriefcase) => {
            coinInBriefcase.isHidden = true;
        });
    }

    public deleteCoinFromBriefcase(coinInBriefcase: CoinInBriefcase) {
        this.coinsInBriefcaseService.removeCoin(coinInBriefcase);
        this.briefcase = this.coinsInBriefcaseService.getBriefcase;
    }

    getCurrentPrice(id: string): string {
        return this.coinsInBriefcaseService.getCurrentCoinPrice(id);
    }
}
