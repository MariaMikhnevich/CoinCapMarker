import type { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, type OnChanges, type OnInit, Output, inject } from '@angular/core';
import { take } from 'rxjs';
import { ChartService } from 'src/app/entities/services/chart.service';
import { VisualChartsService } from 'src/app/entities/services/visual-charts.service';
import { HighchartsChartDirective, HighchartsChartComponent } from 'highcharts-angular';
import { LoadingIndicatorComponent } from '../../loading-indicator/loading-indicator.component';

@Component({
    selector: 'chart',
    templateUrl: './chart.component.html',
    styleUrl: './chart.component.scss',
    imports: [LoadingIndicatorComponent, HighchartsChartDirective, HighchartsChartComponent],
})
export class ChartComponent implements OnInit, OnChanges {
    private readonly chartService = inject(ChartService);
    private readonly visualChartsService = inject(VisualChartsService);

    chartOptions: any;

    public chartPoints!: number[][];

    @Input() id!: string;

    @Input() name!: string;

    @Output() loadError = new EventEmitter<HttpErrorResponse>();

    public ngOnInit(): void {
        this.getChartPoints('m5', 1, ['hour', [3]]);
    }

    private getChartPoints(interval: string, days: number, unit: [string, number[]]) {
        this.chartService
            .getChart(this.id, interval, days)
            .pipe(take(1))
            .subscribe({
                next: (data: number[][]) => {
                    this.chartPoints = data;
                    this.chartOptions = this.visualChartsService.getChartOptions(
                        this.name,
                        this.chartPoints,
                        unit,
                    );
                },
                error: (error: HttpErrorResponse) => {
                    this.loadError.emit(error);
                },
            });
    }

    changeBar(event: Event) {
        switch ((event.target as HTMLSelectElement).value) {
            case 'd1':
                this.getChartPoints('m5', 1, ['hour', [3]]);
                break;
            case 'd7':
                this.getChartPoints('m15', 7, ['day', [1]]);
                break;
            case 'm1':
                this.getChartPoints('h1', 30, ['day', [3]]);
                break;
            default:
                break;
        }
    }

    ngOnChanges(): void {
        this.getChartPoints('m5', 1, ['hour', [3]]);
    }
}
