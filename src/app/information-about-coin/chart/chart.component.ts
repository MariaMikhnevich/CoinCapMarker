import type { HttpErrorResponse } from '@angular/common/http';
import {
    Component,
    computed,
    effect,
    inject,
    input,
    output,
    signal,
    untracked,
} from '@angular/core';
import { take } from 'rxjs';
import { ChartService } from 'src/app/entities/services/chart.service';
import { VisualChartsService } from 'src/app/entities/services/visual-charts.service';
import { HighchartsChartComponent } from 'highcharts-angular';
import type { Options } from 'highcharts';
import type { Coin } from 'src/app/entities/classes/coin.class';
import { LoadingIndicatorComponent } from '../../loading-indicator/loading-indicator.component';

interface SelectOptions {
    value: string;
    label: string;
}

const CHART_PERIODS = [
    { value: 'd1', label: '1 day' },
    { value: 'd7', label: '7 days' },
    { value: 'm1', label: '1 month' },
] as const satisfies SelectOptions[];

type ChartPeriods = (typeof CHART_PERIODS)[number]['value'];

interface ChartConfig {
    interval: string;
    days: number;
    unit: [string, number[]];
}

const CHART_CONFIG: Record<ChartPeriods, ChartConfig> = {
    d1: {
        interval: 'm5',
        days: 1,
        unit: ['hour', [3]],
    },
    d7: {
        interval: 'm15',
        days: 7,
        unit: ['day', [1]],
    },
    m1: {
        interval: 'h1',
        days: 30,
        unit: ['day', [3]],
    },
};

@Component({
    selector: 'chart',
    templateUrl: './chart.component.html',
    styleUrl: './chart.component.scss',
    imports: [LoadingIndicatorComponent, HighchartsChartComponent],
})
export class ChartComponent {
    public readonly coin = input.required<Coin>();

    public readonly loadError = output<HttpErrorResponse>();

    private readonly chartService = inject(ChartService);
    private readonly visualChartsService = inject(VisualChartsService);

    private readonly coinId = computed<string>(() => this.coin().id);
    private readonly coinName = computed<string>(() => this.coin().name);

    protected readonly chartOptions = signal<Options | null>(null);
    protected readonly options = CHART_PERIODS;

    constructor() {
        effect(() => {
            const id = this.coinId();
            if (id) {
                untracked(() => this.getChartPoints(CHART_CONFIG.d1));
            }
        });
    }

    protected changeBar(event: Event) {
        const period = (event.target as HTMLSelectElement).value as ChartPeriods;
        switch (period) {
            case 'd1': {
                this.getChartPoints(CHART_CONFIG.d1);
                break;
            }
            case 'd7': {
                this.getChartPoints(CHART_CONFIG.d7);
                break;
            }
            case 'm1': {
                this.getChartPoints(CHART_CONFIG.m1);
                break;
            }
            default: {
                const exhaustiveCheck: never = period;
                throw new Error(`Неизвестный статус: ${exhaustiveCheck}`);
            }
        }
    }

    private getChartPoints({ interval, days, unit }: ChartConfig) {
        this.chartService
            .getChart(this.coinId(), interval, days)
            .pipe(take(1))
            .subscribe({
                next: (data: number[][]) => {
                    this.chartOptions.set(
                        this.visualChartsService.getChartOptions(this.coinName(), data, unit),
                    );
                },
                error: (error: HttpErrorResponse) => {
                    this.loadError.emit(error);
                },
            });
    }
}
