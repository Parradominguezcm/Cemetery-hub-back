import connectPostgresClient from '../helperFunctions/connectPostgresClient.js'
import { tokenCheck } from '../helperFunctions/tokenCheck.js'

export const noticeBoardController = async (req, res) => {
    const client = connectPostgresClient();
    if (await tokenCheck(client, req.body.token == true)) {
        const messages = await client.query(`
        SELECT * FROM task_manager_messages
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