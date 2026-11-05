// Template for local environment files — committed to git, real files are not.
//
// Setup:
//   1. Get free API keys:
//      - CoinCap: https://coincap.io/api-key (primary data source)
//      - CoinGecko: https://www.coingecko.com/en/developers/dashboard (fallback)
//   2. Copy this file to `environment.ts` (production: true) and
//      `environment.development.ts` (production: false) in this folder.
//   3. Paste your keys into both files.
//
// Both target files are git-ignored, so the keys never reach the repository;
// CI injects the production ones from GitHub Actions secrets.
export const environment = {
    production: true,
    coincap: {
        apiUrl: 'https://rest.coincap.io/v3',
        apiKey: '',
    },
    coingecko: {
        apiUrl: 'https://api.coingecko.com/api/v3',
        apiKey: '',
    },
};
