import connectPostgresClient from "../helperFunctions/connectPostgresClient.js"
import { tokenCheck } from "../helperFunctions/tokenCheck.js"
import { validationResult } from "express-validator"
import jwt from 'jsonwebtoken'

export const messageController = async (req, res) => {

    const client = connectPostgresClient()

    const { message, token } = req.body
    if (await tokenCheck(client, token == true)) {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ error: errors.array() });
        } else {
            const decoded = jwt.verify(token, process.env.SALT);
            const userEmail = decoded.email;
            const userID = await client.query(`
            SELECT id FROM task_manager_users
            WHERE email = '${userEmail}'`)
            const id = userID.rows[0].id
            await client.query(`
            INSERT INTO task_manager_messages
            ( message, user_id, date_posted)
            VALUES
            ('${message}', ${id}, now())`)

            res.send({
                status: true,
                message: 'message posted'
            })
        }
    } else {
        res.status = 404
        res.send({
            status: false,
            message: 'token invalid'
        })
    }

}
