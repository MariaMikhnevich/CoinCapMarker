import { Injectable } from '@angular/core';
import type { Options } from 'highcharts';

@Injectable()
export class VisualChartsService {
    public getChartOptions(
        name: string,
        chartPoints: number[][],
        unit: [string, number[]],
    ): Options {
        return {
            title: {
                text: 'Price change chart',
            },

            tooltip: {
                shared: true,
                useHTML: true,
                headerFormat: '<table><tr><th colspan="2">{point.key}</th></tr>',
                pointFormat:
                    '<tr><td style="color: {series.color}; font-weight: 900; text-shadow: {series.color} 0px 1px 1px;">{series.name}: ' +
                    '</td>' +
                    // eslint-disable-next-line no-template-curly-in-string -- Highcharts replaces the {point.y} token; the leading `$` is a literal dollar sign
                    '<td style="text-align: right; font-weight: 900"><b>${point.y}</b></td></tr>',
                footerFormat: '</table>',
            },
            chart: {
                zooming: {
                    type: 'x',
                },
            },
            xAxis: {
                type: 'datetime',
                minRange: 1000 * 60 * 60,
                units: [unit],
            },
            yAxis: {
                title: {
                    text: 'Price, USD',
                    margin: 25,
                },
            },
            series: [
                {
                    name,
                    type: 'line',
                    data: chartPoints,
                },
            ],
        };
    }
}
