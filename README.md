https://mariamikhnevich.github.io/CoinCapMarker/

# Coincapmarker

A cryptocurrency market dashboard built with Angular: live prices from the
[CoinCap API v3](https://pro.coincap.io/api-docs), a searchable coins table,
per-coin price charts (Highcharts) and a local portfolio ("briefcase") stored
in the browser's localStorage.

## Local setup

The app configuration shape lives in `src/environments/environment.ts`
(committed, no secrets). Secret values are injected at build time from a
git-ignored `.env` file by `scripts/generate-env.mjs`, which npm runs
automatically before `start`/`build`/`watch`/`test` and after `install`.

1. Get free API keys (no card required):
    - CoinCap (primary source): [coincap.io/api-key](https://coincap.io/api-key)
    - CoinGecko (automatic fallback): [coingecko.com developer dashboard](https://www.coingecko.com/en/developers/dashboard)
2. Copy `.env.example` to `.env` and paste your keys there.
3. Run `npm install`, then `npm start` and open `http://localhost:4200/`.

CI does not use `.env` — secrets are passed as environment variables to the
build step (`COINCAP_API_KEY`, `COINGECKO_API_KEY` in Settings → Secrets →
Actions), and the same script turns them into the generated file.

Note: the keys ship inside the client bundle (as any client-side key must).
They are kept out of the repository to prevent leaks via git history.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests with [Vitest](https://vitest.dev) in a
jsdom environment — no browser is required.

## Linting and formatting

The project uses [ESLint](https://eslint.org) (Airbnb-based rules via
[eslint-config-airbnb-extended](https://eslint-airbnb-extended.nishargshah.dev/) plus
[angular-eslint](https://angular.dev/tools/linting)) and [Prettier](https://prettier.io):

- `npm run lint` — check the code with ESLint (`npm run lint:fix` to auto-fix)
- `npm run format` — format the code with Prettier (`npm run format:check` to only check)

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
