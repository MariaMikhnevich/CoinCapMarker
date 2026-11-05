/**
 * The contract of the app configuration. Declared in a separate file so that
 * both environment.ts and environment.development.ts can share it: those two
 * are swapped into each other's place by the dev build's fileReplacements,
 * so they must not import from one another.
 */
interface CoinProviderConfig {
    apiUrl: string;
    apiKey: string;
}

export interface AppEnvironment {
    production: boolean;
    coincap: CoinProviderConfig;
    coingecko: CoinProviderConfig;
}
