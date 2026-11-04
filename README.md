https://riverbeaver.github.io/CoinCapMarker/

# Coincapmarker

A cryptocurrency market dashboard built with Angular: live prices from the
[CoinCap API v3](https://pro.coincap.io/api-docs), a searchable coins table,
per-coin price charts (Highcharts) and a local portfolio ("briefcase") stored
in the browser's localStorage.

## Local setup

The app reads its API key from `src/environments/`, and those files are
git-ignored so the key never enters version control.

1. Get a free CoinCap API key: [coincap.io/api-key](https://coincap.io/api-key)
   (free tier: 500 requests/month, 5 requests/minute — no card required).
2. Copy `src/environments/environment.example.ts` to `environment.ts` and
   `environment.development.ts` in the same folder and paste your key into
   `apiKey` in both.
3. Run `npm install`, then `ng serve` and open `http://localhost:4200/`.

Note: the free key ships inside the client bundle (as any client-side key
must). It is kept out of the repository to prevent leaks via git history;
CI injects it at build time from GitHub Actions secrets.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

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
