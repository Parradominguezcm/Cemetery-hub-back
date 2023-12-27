import { Router } from 'express'
import express from 'express'
import { createTaskController } from './createTaskController.js'
import { check } from 'express-validator'
import { allTasksController } from './allTasksController.js'
import { editTaskController } from './editTaskController.js'

const taskRouter = Router()
const taskValidator = [
    check('task_title', 'task name').notEmpty().escape().withMessage('You need to name your task'),
    check('task_description').escape(),
    check('task_deadline').escape(),
    check('task_completed').toBoolean(),
];

taskRouter.use(express.json())
taskRouter.get('/alltasks', allTasksController)
taskRouter.post('/createtask', taskValidator, createTaskController)
taskRouter.post('/edittask', taskValidator, editTaskController)


export default taskRouter


