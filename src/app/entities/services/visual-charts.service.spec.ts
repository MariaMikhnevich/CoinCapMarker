import { beforeEach, describe, expect, it } from 'vitest';
import { VisualChartsService } from './visual-charts.service';

describe('VisualChartsService', () => {
    let service: VisualChartsService;

    beforeEach(() => {
        service = new VisualChartsService();
    });

    it('builds a titled line chart from the price history', () => {
        const points = [
            [1730000000000, 50000],
            [1730000600000, 50100],
        ];
        const options = service.getChartOptions('Bitcoin', points, ['hour', [3]]);

        expect(options.title?.text).toBe('Price change chart');
        expect(options.series?.[0]).toMatchObject({
            name: 'Bitcoin',
            type: 'line',
            data: points,
        });
    });

    it('uses the provided tick unit on the time axis', () => {
        const options = service.getChartOptions('Bitcoin', [], ['day', [1]]);

        expect(options.xAxis).toMatchObject({
            type: 'datetime',
            units: [['day', [1]]],
        });
    });

    it('measures the price axis in USD', () => {
        const options = service.getChartOptions('Bitcoin', [], ['day', [1]]);

        expect(options.yAxis).toMatchObject({
            title: { text: 'Price, USD' },
        });
    });
});
