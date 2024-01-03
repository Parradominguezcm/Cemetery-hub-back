import connectPostgresClient from '../helperFunctions/connectPostgresClient.js'
import { tokenCheck } from '../helperFunctions/tokenCheck.js'
import { validationResult } from "express-validator"

export const editTaskController = async (req, res) => {
    const client = connectPostgresClient();
    const { id, task_title, task_description, task_completed, token } = req.body

    if (await tokenCheck(client, token == true)) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ error: errors.array() });
        } else {
            await client.query(`
                UPDATE task_manager_task
                SET task_completed = ${task_completed}
                WHERE id = '${id}';
                `)

            return res.send({
                status: true,
                message: 'task edited successfully'
            })
        }
    } else {
        res.status = 404
        res.send({
            status: false,
            message: 'Token invalid'
        })
    }
}