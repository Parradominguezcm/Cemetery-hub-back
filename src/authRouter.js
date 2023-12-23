import { Router } from 'express'
import express from 'express'
import loginController from './loginController.js'
import signupController from './signupController.js'
import { check } from 'express-validator'
import { userValidationController } from './userValidationController.js'

const router = Router()

router.use(express.json())

const loginValidator = [
    check('email', 'enter a valid email address').notEmpty().escape().isEmail().normalizeEmail().withMessage('insert a real email address'),
    check('userpassword').isLength({ min: 8 })
        .withMessage('Password Must Be at Least 8 Characters')
        .matches('[0-9]').withMessage('Password Must Contain a Number')
        .matches('[A-Z]').withMessage('Password Must Contain an Uppercase Letter')];

router.post('/login', loginValidator, loginController)


const signupValidator = [
    check('email', 'email must be valid').notEmpty().escape().isEmail().normalizeEmail().withMessage('insert a real email address'),
    check('username', 'username must be at least 5 characters').notEmpty().escape().isLength({ min: 5 }),
    check('firstname', 'name must be at least 2 characters').notEmpty().escape().isLength({ min: 2 }),
    check('lastname', 'lname must be at least 2 characters').notEmpty().escape().isLength({ min: 2 }),
    check('userpassword').isLength({ min: 8 })
        .withMessage('Password Must Be at Least 8 Characters')
        .matches('[0-9]').withMessage('Password Must Contain a Number')
        .matches('[A-Z]').withMessage('Password Must Contain an Uppercase Letter')];


router.post("/signup", signupValidator, signupController)

router.post("/users", userValidationController)

export default router