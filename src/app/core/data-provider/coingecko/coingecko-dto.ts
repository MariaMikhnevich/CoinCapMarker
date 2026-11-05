/**
 * Shapes of the raw CoinGecko v3 responses (https://api.coingecko.com/api/v3).
 * Unlike CoinCap, numeric fields arrive as numbers (nullable) — the provider
 * converts them into the string-based domain model at the API boundary.
 */
export interface CoinGeckoMarketDto {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number | null;
    market_cap: number | null;
    market_cap_rank: number | null;
    price_change_percentage_24h: number | null;
    circulating_supply: number | null;
    total_supply: number | null;
    max_supply: number | null;
}

export interface CoinGeckoCoinResponse {
    id: string;
    symbol: string;
    name: string;
    market_cap_rank: number | null;
    image: { thumb: string; small: string; large: string };
    market_data: {
        current_price: Record<string, number | null>;
        market_cap: Record<string, number | null>;
        price_change_percentage_24h: number | null;
        circulating_supply: number | null;
        max_supply: number | null;
    } | null;
}

export interface CoinGeckoMarketChartResponse {
    prices: [number, number][];
}
