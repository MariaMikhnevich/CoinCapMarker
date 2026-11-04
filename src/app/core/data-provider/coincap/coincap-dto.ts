/**
 * Shapes of the raw CoinCap v3 responses (https://rest.coincap.io/v3).
 * All numeric fields arrive as strings — they are converted to the domain
 * model inside the provider, at the API boundary.
 */
export interface CoinCapAssetsResponse {
    data: CoinCapAssetDto[];
    timestamp: number;
}

export interface CoinCapAssetResponse {
    data: CoinCapAssetDto;
    timestamp: number;
}

export interface CoinCapHistoryResponse {
    data: CoinCapHistoryPointDto[];
    timestamp: number;
}

export interface CoinCapAssetDto {
    id: string;
    rank: string;
    symbol: string;
    name: string;
    supply: string | null;
    maxSupply: string | null;
    marketCapUsd: string;
    volumeUsd24Hr: string;
    priceUsd: string;
    changePercent24Hr: string;
    vwap24Hr: string;
    explorer: string | null;
}

export interface CoinCapHistoryPointDto {
    priceUsd: string;
    time: number;
    date: string;
}
