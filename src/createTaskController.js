import connectPostgresClient from "./helperFunctions/connectPostgresClient.js"
import { tokenCheck } from "./helperFunctions/tokenCheck.js"
import { validationResult } from "express-validator"
import jwt from 'jsonwebtoken'

export const createTaskController = async (req, res) => {

    const client = connectPostgresClient()

    const { task_title, task_description, task_deadline, task_completed, token } = req.body
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
            INSERT INTO task_manager_task
            (task_title, task_description, task_deadline, task_completed, user_id, time_created)
            VALUES
            ('${task_title}', '${task_description}', '${task_deadline}', ${task_completed}, ${id}, now())`)

            res.send({
                status: true,
                message: 'task added'
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
