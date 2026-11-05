import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, map, of, switchMap } from 'rxjs';
import { COINS_DATA_PROVIDER } from '../../core/data-provider/data-provider.token';
import { CoinInBriefcase } from '../classes/coin-in-briefcase.class';
import type { Coin } from '../classes/coin.class';
import { CoinsService } from './coins.service';

@Injectable()
export class CoinsInBriefcaseService {
    private coinsService = inject(CoinsService);

    private readonly provider = inject(COINS_DATA_PROVIDER);

    public currentCoins: Coin[] = [];

    #briefcase: CoinInBriefcase[];

    #difference = new BehaviorSubject<number>(0);

    #percentageDifference = new BehaviorSubject<number>(0);

    #briefcaseValue = new BehaviorSubject<number>(0);

    constructor() {
        const briefcaseFromLocalStorage = localStorage.getItem('briefcase');
        if (briefcaseFromLocalStorage === null) {
            localStorage.setItem('briefcase', JSON.stringify([]));
            this.#briefcase = [];
        } else {
            this.#briefcase = JSON.parse(briefcaseFromLocalStorage);
            this.#briefcaseValue.next(this.getBriefcaseValue());
        }
        this.getCurrentCoins();
    }

    get getBriefcase(): CoinInBriefcase[] {
        return this.#briefcase;
    }

    get briefcaseValue(): BehaviorSubject<number> {
        return this.#briefcaseValue;
    }

    get differenceInValueOfCoins(): BehaviorSubject<number> {
        return this.#difference;
    }

    get percentageDifferenceInValueOfCoins(): BehaviorSubject<number> {
        return this.#percentageDifference;
    }

    public addCoin(coin: Coin, quantity: number) {
        this.#briefcase.push(new CoinInBriefcase(coin, quantity, Date.now()));
        localStorage.setItem('briefcase', JSON.stringify(this.#briefcase));

        this.#briefcaseValue.next(this.getBriefcaseValue());

        if (!this.currentCoins.find((currentCoin: Coin) => currentCoin.id === coin.id))
            this.currentCoins.push(coin);
        this.updateDifference();
    }

    public removeCoin(coinInBriefcase: CoinInBriefcase) {
        const indexCoin = this.#briefcase.findIndex(
            (currentCoin: CoinInBriefcase) =>
                currentCoin.timeAddition === coinInBriefcase.timeAddition,
        );
        if (indexCoin !== -1) {
            this.#briefcase.splice(indexCoin, 1);
            localStorage.setItem('briefcase', JSON.stringify(this.#briefcase));

            this.#briefcaseValue.next(this.getBriefcaseValue());
            this.updateDifference();
        }
    }

    public getCurrentCoinPrice(id: string): string {
        const coin = this.currentCoins.find((currentCoin: Coin) => currentCoin.id === id);
        if (!coin) return '';
        return coin.priceUsd;
    }

    private getCurrentCoins() {
        const arrayId: string[] = [];
        this.#briefcase.forEach((coinInBriefcase) => {
            if (arrayId.find((id: string) => id === coinInBriefcase.coin.id)) return;
            arrayId.push(coinInBriefcase.coin.id);
        });
        arrayId.forEach((id) => {
            this.fillCurrentCoinsWithNewCoin(id);
        });
    }

    private fillCurrentCoinsWithNewCoin(id: string) {
        // Prices come from the shared cached assets list; only coins outside
        // that list (beyond the top 2000) trigger an individual request.
        this.coinsService
            .getAssets()
            .pipe(
                map((coins) => coins.find((coin) => coin.id === id)),
                switchMap((coin) => (coin ? of(coin) : this.provider.getAsset(id))),
            )
            .subscribe({
                next: (data: Coin) => {
                    this.currentCoins.push(data);
                    this.updateDifference();
                },
                // briefcase prices stay at their saved values if data cannot be fetched
                error: () => {},
            });
    }

    private updateDifference() {
        const value = this.currentCoins.reduce((acc: number, coin: Coin) => {
            const quantity = this.#briefcase
                .filter((coinInBriefcase) => coinInBriefcase.coin.id === coin.id)
                .reduce((total: number, coinInBriefcase) => total + coinInBriefcase.quantity, 0);
            return acc + +coin.priceUsd * quantity;
        }, 0);
        this.#difference.next(value - this.getBriefcaseValue());
        this.#percentageDifference.next(
            (value - this.getBriefcaseValue()) / this.getBriefcaseValue(),
        );
    }

    private getBriefcaseValue(): number {
        return this.#briefcase.reduce(
            (briefcaseValue: number, coinInBriefcase) =>
                briefcaseValue + +coinInBriefcase.coin.priceUsd * coinInBriefcase.quantity,
            0,
        );
    }
}
