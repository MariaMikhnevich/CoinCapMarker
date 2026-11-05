import type { ChartPoint } from './coins-data-provider';

function toChartTime(time: number): number {
    return Math.floor(+time / 1000) * 1000 + -new Date(time).getTimezoneOffset() * 60 * 1000;
}

function toChartPrice(price: number): number {
    if (price < 0.1) return +price.toFixed(5);
    if (price < 10) return +price.toFixed(4);
    return +price.toFixed(2);
}

/**
 * Converts a raw [timestamp, price] pair into the chart format the app uses:
 * timestamps rounded to seconds and shifted into the viewer's local timezone
 * (kept identical to the original CoinCap-era behaviour so charts look the
 * same regardless of the active data provider).
 */
export function toChartPoint(time: number, price: number): ChartPoint {
    return [toChartTime(time), toChartPrice(price)];
}
