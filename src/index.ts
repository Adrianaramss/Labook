import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from "dotenv"
import { userRouter } from './Router/userRouter'
import { postRouter } from './Router/postRouter'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.listen(Number(process.env.PORT), () => {
    console.log(`Servidor rodando na porta ${Number(process.env.PORT)}`)
})

app.use("/users", userRouter)
app.use("/posts", postRouter )