import connectPostgresClient from '../helperFunctions/connectPostgresClient.js'
import { tokenCheck } from '../helperFunctions/tokenCheck.js'

export const allTasksController = async (req, res) => {
    const client = connectPostgresClient();
    if (await tokenCheck(client, req.body.token == true)) {
        const allTasks = await client.query(`
        SELECT * FROM task_manager_task ORDER BY id
        `)

        return res.send(allTasks.rows)

    } else {
        res.status = 404
        res.send({
            status: false,
            message: 'Token invalid'
        })
    }
}