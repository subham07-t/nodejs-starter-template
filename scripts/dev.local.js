import { execSync } from 'child_process';

const majorNodeVersion = parseInt(process.versions.node.split('.')[0], 10);

let command =
  majorNodeVersion >= 20
    ? 'cross-env NODE_ENV=development node --env-file .env.development.local ./src/server.js'
    : 'cross-env NODE_ENV=development node -r dotenv/config src/server.js dotenv_config_path=.env.development.local';

execSync(command, { stdio: 'inherit' });
