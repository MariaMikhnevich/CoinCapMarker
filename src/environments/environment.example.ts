// Template for local environment files — committed to git, real files are not.
//
// Setup:
//   1. Get a free CoinCap API key: https://coincap.io/api-key
//   2. Copy this file to `environment.ts` (production: true) and
//      `environment.development.ts` (production: false) in this folder.
//   3. Paste your key into `apiKey` in both files.
//
// Both target files are git-ignored, so the key never reaches the repository.
export const environment = {
    production: true,
    coincap: {
        apiUrl: 'https://rest.coincap.io/v3',
        apiKey: '',
    },
};
