import express from 'express'
import authRouter from "./authRouter.js"
import taskRouter from './taskRouter.js'
import 'dotenv/config'
const app = express()
const port = 3000

app.use("/", authRouter, taskRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

