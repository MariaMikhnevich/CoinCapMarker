import type { AppEnvironment } from './environment.types';
import { env } from './env.generated';

// The shape of the app configuration — the single source of truth for its
// structure. Secret values are injected at build time from environment
// variables (CI) or the local .env by scripts/generate-env.mjs; the expected
// names are listed in .env.example. This file contains no secrets.
export const environment = {
    production: true,
    coincap: {
        apiUrl: 'https://rest.coincap.io/v3',
        apiKey: env.COINCAP_API_KEY,
    },
    coingecko: {
        apiUrl: 'https://api.coingecko.com/api/v3',
        apiKey: env.COINGECKO_API_KEY,
    },
} satisfies AppEnvironment;
