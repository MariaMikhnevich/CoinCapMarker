import type { AppEnvironment } from './environment.types';
import { env } from './env.generated';

// Development variant (swapped in by the development build). Kept in the
// conventional explicit form: importing './environment' here would be
// self-referential after the dev fileReplacement. Contains no secrets.
export const environment = {
    production: false,
    coincap: {
        apiUrl: 'https://rest.coincap.io/v3',
        apiKey: env.COINCAP_API_KEY,
    },
    coingecko: {
        apiUrl: 'https://api.coingecko.com/api/v3',
        apiKey: env.COINGECKO_API_KEY,
    },
} satisfies AppEnvironment;
