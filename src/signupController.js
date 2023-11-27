import pkg from 'pg';
import bcrypt from 'bcrypt';
const { Client } = pkg;

const signupController = async (req, res) => {
    const client = new Client({
        "label": "127.0.0.1",
        "host": "127.0.0.1",
        "user": "postgres",
        "port": 5432,
        "ssl": false,
        "database": "task_manager",
        "password": ""
    })
    const { email, username, firstname, lastname, userpassword } = req.body
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(userpassword, salt);
    // Store hash in your password DB.
    client.connect()

    const users = await client.query(`SELECT email FROM task_manager_users WHERE email = '${email}'`)

    if (users.rows.length === 0) {
        const x = await client.query(`
        INSERT INTO task_manager_users
        (email, username, firstname, lastname, userpassword)
        VALUES
        ('${email}', '${username}','${firstname}', '${lastname}', '${hash}')`)

        res.status = 201
        res.send({
            message: 'USER_CREATED',
            status: x.rowCount > 0
        })
    } else {
        res.status = 400
        res.send({
            status: false,
            message: 'USER_EXISTS'
        })

    }
}

export default signupController// connnect to the client
// read data from the req
// write sql query to insert a record into users
// query database
// return success state