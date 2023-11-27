import pkg from 'pg';
const { Client } = pkg;

const loginController = async (req, res) => {
    const client = new Client({
        "label": "127.0.0.1",
        "host": "127.0.0.1",
        "user": "postgres",
        "port": 5432,
        "ssl": false,
        "database": "task_manager",
        "password": ""
    })

    client.connect()

    const x = await client.query('SELECT * from task_manager_users')

    res.send(x)
}

export default loginController