import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from "dotenv"
// import { Post } from './models/post'
// import { TPostDB} from './Types'
import { PostController } from './controller/Postcontroller'
import { UserController } from './controller/userController'
import { userRouter } from './Router/userRouter'
import { postRouter } from './Router/postRouter'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.listen(Number(process.env.PORT), () => {
    console.log(`Servidor rodando na porta ${Number(process.env.PORT)}`)
})

app.get("/ping", async (req: Request, res: Response) => {
    try {
        res.status(200).send({ message: "Pong!" })
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})
///========================endpoints========================///

// const postController = new PostController()
// // const userController = new UserController()

// app.get("/posts",  postController.getPosts)

// app.post("/posts", postController.createPosts)

// app.delete("/posts/:id", postController.deletePosts)

// app.put("/posts/:id", postController.updatePosts)

// app.get("/users", userController.getUsers)

// app.post("/users", userController.createUser)

app.use("/users", userRouter)
app.use("/posts", postRouter )