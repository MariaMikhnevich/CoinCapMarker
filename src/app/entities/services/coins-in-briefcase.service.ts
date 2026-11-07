import { Injectable, inject, signal } from '@angular/core';
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

    readonly #briefcase = signal<CoinInBriefcase[]>([]);

    /** Reactive read-only view of the stored briefcase; updates on add/remove. */
    public readonly briefcase = this.#briefcase.asReadonly();

    #difference = new BehaviorSubject<number>(0);

    #percentageDifference = new BehaviorSubject<number>(0);

    #briefcaseValue = new BehaviorSubject<number>(0);

    public readonly briefcaseValue$ = this.#briefcaseValue.asObservable();

    public readonly differenceInValueOfCoins$ = this.#difference.asObservable();

    public readonly percentageDifferenceInValueOfCoins$ = this.#percentageDifference.asObservable();

    constructor() {
        this.#briefcase.set(this.readBriefcaseFromStorage());
        this.#briefcaseValue.next(this.getBriefcaseValue());
        this.getCurrentCoins();
    }

    public addCoin(coin: Coin, quantity: number) {
        this.#briefcase.update((briefcase) => [
            ...briefcase,
            new CoinInBriefcase(coin, quantity, Date.now()),
        ]);
        this.persistBriefcase();

        this.#briefcaseValue.next(this.getBriefcaseValue());

        if (!this.currentCoins.find((currentCoin: Coin) => currentCoin.id === coin.id))
            this.currentCoins.push(coin);
        this.updateDifference();
    }

    public removeCoin(coinInBriefcase: CoinInBriefcase) {
        const isRemovedCoin = (currentCoin: CoinInBriefcase) =>
            currentCoin.timeAddition === coinInBriefcase.timeAddition;
        if (!this.#briefcase().some(isRemovedCoin)) return;

        this.#briefcase.update((briefcase) => briefcase.filter((coin) => !isRemovedCoin(coin)));
        this.persistBriefcase();

        this.#briefcaseValue.next(this.getBriefcaseValue());
        this.updateDifference();
    }

    public getCurrentCoinPrice(id: string): string {
        const coin = this.currentCoins.find((currentCoin: Coin) => currentCoin.id === id);
        if (!coin) return '';
        return coin.priceUsd;
    }

    private readBriefcaseFromStorage(): CoinInBriefcase[] {
        const stored = localStorage.getItem('briefcase');
        if (stored === null) {
            localStorage.setItem('briefcase', JSON.stringify([]));
            return [];
        }
        try {
            return JSON.parse(stored);
        } catch {
            // Corrupted storage must not crash the app at startup.
            return [];
        }
    }

    private persistBriefcase() {
        localStorage.setItem('briefcase', JSON.stringify(this.#briefcase()));
    }

    private getCurrentCoins() {
        const arrayId: string[] = [];
        this.#briefcase().forEach((coinInBriefcase) => {
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
            const quantity = this.#briefcase()
                .filter((coinInBriefcase) => coinInBriefcase.coin.id === coin.id)
                .reduce((total, coinInBriefcase) => total + coinInBriefcase.quantity, 0);
            return acc + +coin.priceUsd * quantity;
        }, 0);
        this.#difference.next(value - this.getBriefcaseValue());
        this.#percentageDifference.next(
            (value - this.getBriefcaseValue()) / this.getBriefcaseValue(),
        );
    }

    private getBriefcaseValue(): number {
        return this.#briefcase().reduce(
            (briefcaseValue: number, coinInBriefcase: CoinInBriefcase) =>
                briefcaseValue + +coinInBriefcase.coin.priceUsd * coinInBriefcase.quantity,
            0,
        );
    }
}
