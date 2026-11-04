import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChartService } from 'src/app/entities/services/chart.service';
import { VisualChartsService } from 'src/app/entities/services/visual-charts.service';

@Component({
    selector: 'chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss'],
    standalone: false,
})
export class ChartComponent implements OnInit, OnChanges {
    private chartService = inject(ChartService);

    private visualChartsService = inject(VisualChartsService);

    chartOptions: any;

    private subscription!: Subscription;

    public chartPoints!: number[][];

    @Input() id!: string;

    @Input() name!: string;

    @Output() loadError = new EventEmitter<HttpErrorResponse>();

    ngOnInit(): void {
        this.getChartPoints('m5', 1, ['hour', [3]]);
    }

    public getChartPoints(interval: string, days: number, unit: [string, number[]]) {
        this.subscription = this.chartService.getChart(this.id, interval, days).subscribe({
            next: (data: number[][]) => {
                this.chartPoints = data;
                this.chartOptions = this.visualChartsService.getChartOptions(
                    this.name,
                    this.chartPoints,
                    unit,
                );
                this.subscription.unsubscribe();
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
