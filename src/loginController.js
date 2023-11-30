import pkg from 'pg';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator';
import connectPostgresClient from './helperFunctions/connectPostgresClient.js';

const { Client } = pkg;

const loginController = async (req, res) => {


    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ error: errors.array() });
    }

    const client = connectPostgresClient();

    const { email, userpassword } = req.body
    const users = await client.query(`
    SELECT email, userpassword, id FROM task_manager_users
    WHERE email = '${email}'
    `)

    const hash = users.rows[0].userpassword

    const isPasswordValid = await bcrypt.compare(userpassword, hash)


    if (isPasswordValid === true) {
        //generate new JWT token, handle the validation for the front end 
        var now = new Date().getTime();
        var fiveDaysFromNow = now + (1000 * 60 * 60 * 24 * 5);
        var token = jwt.sign({ email, expiryDate: fiveDaysFromNow }, 'shhhhh');
        await client.query(`
        INSERT INTO task_manager_tokens
        (user_id, token, expires_at)
        VALUES
        (${users.rows[0].id}, '${token}','${fiveDaysFromNow}')`)

        res.status = 200
        res.send({
            status: true,
            token,
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