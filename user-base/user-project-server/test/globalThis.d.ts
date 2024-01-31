import { StartedDockerComposeEnvironment } from 'testcontainers';

declare global {
  /* eslint-disable no-var */
  var environment: StartedDockerComposeEnvironment;
  /* eslint-enable no-var */
}

export {};
