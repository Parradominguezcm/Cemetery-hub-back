import { Router } from 'express'
import express from 'express'
import { check } from 'express-validator'
import { messageController } from '../controllers/messageController.js'
import { noticeBoardController } from '../controllers/noticeBoardController.js'

const noticeBoardRouter = Router()

noticeBoardRouter.use(express.json())

const messageValidator = [
    check('message').notEmpty().escape().withMessage('Write a message to post')]

noticeBoardRouter.get('/noticeBoard', noticeBoardController)
noticeBoardRouter.post('/writeMessage', messageValidator, messageController)

export default noticeBoardRouter