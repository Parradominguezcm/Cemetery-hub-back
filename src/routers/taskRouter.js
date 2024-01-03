import { Router } from 'express'
import express from 'express'
import { check } from 'express-validator'
import { createTaskController } from '../controllers/createTaskController.js'
import { allTasksController } from '../controllers/allTasksController.js'
import { editTaskController } from '../controllers/editTaskController.js'

const taskRouter = Router()
const taskValidator = [
    check('task_title', 'task name').notEmpty().escape().withMessage('You need to name your task'),
    check('task_description').escape(),
    check('task_deadline').escape(),
    check('task_completed').toBoolean(),
];
const editTaskValidator = [
    check('id').notEmpty().escape(),
    check('task_completed').toBoolean()
]

taskRouter.use(express.json())
taskRouter.post('/alltasks', allTasksController)
taskRouter.post('/createtask', taskValidator, createTaskController)
taskRouter.post('/edittask', editTaskValidator, editTaskController)


export default taskRouter


