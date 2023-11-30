import { Router } from 'express'
import express from 'express'
import jwt from 'jsonwebtoken'
import connectPostgresClient from './helperFunctions/connectPostgresClient.js'


const taskRouter = Router()

taskRouter.use(express.json())
taskRouter.get('/alltasks', async (req, res) => {
    const client = connectPostgresClient();

    var decoded = jwt.verify(req.body.token, 'shhhhh');
    const users = await client.query(`
    SELECT *
    FROM task_manager_tokens
    JOIN task_manager_users ON task_manager_tokens.user_id = task_manager_users.id
    WHERE token = '${req.body.token}'
    `)

    var now = new Date();
    if (new Date(users.rows[0].expires_at) < now) {
        // selected date is in the past
        res.status = 500
        res.send({
            status: false,
            message: "EXPIRED TOKEN"
        })
    }

    res.send({
        'mock': decoded
    })
})


export default taskRouter


