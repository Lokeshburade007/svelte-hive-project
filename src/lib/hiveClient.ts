import { Client } from '@hiveio/dhive';

const client = new Client([
    "https://api.hive.blog",
    "https://api.openhive.network"
]);

export default client;