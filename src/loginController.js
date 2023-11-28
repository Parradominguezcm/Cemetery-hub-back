import pkg from 'pg';
import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator';

const { Client } = pkg;

const loginController = async (req, res) => {
    const client = new Client({
        "label": "127.0.0.1",
        "host": "127.0.0.1",
        "user": "postgres",
        "port": 5432,
        "ssl": false,
        "database": "task_manager",
        "password": process.env.DB_PWD
    })

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ error: errors.array() });
    }

    client.connect()

    const { email, userpassword } = req.body
    const users = await client.query(`SELECT email, userpassword FROM task_manager_users WHERE email = '${email}'`)
    const hash = users.rows[0].userpassword

    const isPasswordValid = await bcrypt.compare(userpassword, hash)


    if (isPasswordValid === true) {
        //generate new JWT token, handle the validation for the front end 
        res.status = 200
        res.send({
            status: true,
            message: 'LOGIN SUCCESSFUL'
        })
    } else {
        res.status = 404
        res.send({
            status: false,
            message: 'LOGIN FAILED'
        })
    }

}

export default loginController