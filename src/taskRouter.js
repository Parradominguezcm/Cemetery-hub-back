import { Router } from 'express'
import express from 'express'
import connectPostgresClient from './helperFunctions/connectPostgresClient.js'
import { tokenCheck } from './helperFunctions/tokenCheck.js'
import { createTaskController } from './createTaskController.js'
import { check } from 'express-validator'

const taskRouter = Router()
const taskValidator = [
    check('task_title', 'task name').notEmpty().escape().withMessage('You need to name your task'),
    check('task_description').escape(),
    check('task_deadline').escape(),
    check('task_completed').toBoolean(),
];

taskRouter.use(express.json())
taskRouter.get('/alltasks', async (req, res) => {
    const client = connectPostgresClient();
    if (await tokenCheck(client, req.body.token == true)) {
        res.send({
            status: true
        })
    } else {
        res.status = 404
        res.send({
            status: false,
        })
    }
})

taskRouter.post('/createtask', taskValidator, createTaskController)


export default taskRouter


