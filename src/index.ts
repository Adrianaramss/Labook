import express, { Request, Response } from 'express'
import cors from 'cors'
import { db } from './database/knex';
import { Post } from './models/post'
import { TPostDB} from './Types'

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
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
//==========Get post====================

app.get("/posts", async (req: Request, res: Response) => {
    try {
        const q = req.query.q

        let postsDB

        if (q) {
            const result: TPostDB[] = await db("posts").where("content", "LIKE", `%${q}%`)
            postsDB = result
        } else {
            const result: TPostDB[] = await db("posts")
            postsDB = result
        }

        const posts: Post[] = postsDB.map((postDB) => new Post(
            postDB.id,
            postDB.creator_id,
            postDB.content,
            postDB.likes,
            postDB.dislikes,
            postDB.created_at,
            postDB.updated_at
        ))

        res.status(200).send(posts)
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