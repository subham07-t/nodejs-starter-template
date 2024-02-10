import { execSync } from 'child_process';

const majorNodeVersion = parseInt(process.versions.node.split('.')[0], 10);

let command =
  majorNodeVersion >= 20
    ? 'cross-env NODE_ENV=test node --env-file .env.production.local src/server.js'
    : 'cross-env NODE_ENV=test node -r dotenv/config src/server.js dotenv_config_path=.env.production.local';

execSync(command, { stdio: 'inherit' });
