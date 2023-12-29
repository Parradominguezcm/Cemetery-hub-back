import connectPostgresClient from '../helperFunctions/connectPostgresClient.js'
import { tokenCheck } from '../helperFunctions/tokenCheck.js'

export const noticeBoardController = async (req, res) => {
    const client = connectPostgresClient();
    if (await tokenCheck(client, req.body.token == true)) {
        const messages = await client.query(`
        SELECT message, date_posted, user_id, username FROM task_manager_messages
        JOIN task_manager_users ON task_manager_users.id = user_id
        `)

        return res.send(messages.rows)

    } else {
        res.status = 404
        res.send({
            status: false,
            message: 'Token invalid'
        })
    }
}