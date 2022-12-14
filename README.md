# ReactJS Test for Double Nines

## React (vite CLI)

### Requirements
- Node 14+
- npm v6+

## Run with NPM
`npm start`

## Run with Yarn
`yarn start`

### Instructions
- Download the repo.
- Set the configuration parameters in the `docker-compose.yml` file.
- run `npm install`
- The console will provide the dev local URL


### Testing
- Run `npm test` to start the unit tests.

### Lint
- Run `npm run lint` to start the linter.
- Run `npm run lint:fix` to start the linter fixer.

## API Config file
Found in: `src/config/api.js`
Edit this file with the URL provided by the backend, should do this ONLY when the backend gives you an URL other than the one in the `ENDPOINT_BASE_URL` variable.
