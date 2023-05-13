import { ExtendendClient } from './structs/extendedClient';
export * from 'colors';
import config from './config.json';

const client = new ExtendendClient();

client.start();

export { client };
