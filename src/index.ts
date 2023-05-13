import { ExtendendClient } from './structs/extendedClient';
export * from 'colors';
import config from './config.json';
import { connectDB } from './config/db';

const client = new ExtendendClient();

connectDB();
client.start();

export { client };
