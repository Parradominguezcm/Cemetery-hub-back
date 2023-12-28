import express from 'express'
import authRouter from "./routers/authRouter.js"
import taskRouter from './routers/taskRouter.js'
import 'dotenv/config'
const app = express()
const port = 3000

app.use("/", authRouter, taskRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

