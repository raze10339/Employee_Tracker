import pg from 'pg';

const { Client } = pg;
const client = new Client({
    user: 'postgres',
    password: '1361',
    database: 'employee_tracker'
});

await client.connect();
export default client;