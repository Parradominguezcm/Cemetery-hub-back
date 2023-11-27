import { Router } from 'express'
import express from 'express'
import loginController from './loginController.js'
import signupController from './signupController.js'

const router = Router()

router.use(express.json())

router.get('/login', loginController)
router.post("/signup", signupController)

export default router