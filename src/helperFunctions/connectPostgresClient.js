import pkg from 'pg';
const { Client } = pkg;

function connectPostgresClient() {
    const client = new Client({
        "label": "127.0.0.1",
        "host": "127.0.0.1",
        "user": "postgres",
        "port": 5432,
        "ssl": false,
        "database": "task_manager",
        "password": process.env.DB_PWD
    });

    client.connect();
    return client;
}

export default connectPostgresClient