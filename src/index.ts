import express, { Request, Response } from 'express'
import cors from 'cors'
// import { Post } from './models/post'
// import { TPostDB} from './Types'
import { PostController } from './controller/Postcontroller'

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
///========================Get post========================///

const postController = new PostController()

app.get("/posts",  postController.getPosts)




// app.get("/posts", async (req: Request, res: Response) => {
//     try {
//         const q = req.query.q

//         let postsDB

//         if (q) {
//             const result: TPostDB[] = await db("posts").where("content", "LIKE", `%${q}%`)
//             postsDB = result
//         } else {
//             const result: TPostDB[] = await db("posts")
//             postsDB = result
//         }

//         const posts: Post[] = postsDB.map((postDB) => new Post(
//             postDB.id,
//             postDB.creator_id,
//             postDB.content,
//             postDB.likes,
//             postDB.dislikes,
//             postDB.created_at,
//             postDB.updated_at
//         ))

//         res.status(200).send(posts)
//     } catch (error) {
//         console.log(error)

//         if (req.statusCode === 200) {
//             res.status(500)
//         }

//         if (error instanceof Error) {
//             res.send(error.message)
//         } else {
//             res.send("Erro inesperado")
//         }
//     }
// })


///========================Create post========================///
// app.post("/posts", async (req: Request, res: Response) => {
//     try {
//         const { id, creatorId, content, likes, dislikes } = req.body

//         if (typeof id !== "string") {
//             res.status(400)
//             throw new Error("'id' deve ser string")
//         }

//         if (typeof creatorId !== "string") {
//             res.status(400)
//             throw new Error("'creatorId' deve ser string")
//         }

//         if (typeof content !== "string") {
//             res.status(400)
//             throw new Error("'content' deve ser string")
//         }

//         if (typeof likes !== "number") {
//             res.status(400)
//             throw new Error("'likes' deve ser number")
//         }

//         if (typeof dislikes !== "number") {
//             res.status(400)
//             throw new Error("'dislikes' deve ser bolean")
//         }

//         const [postDBExists]: TPostDB[] | undefined[] = await db("posts").where({ id })

//         if (postDBExists) {
//             res.status(400)
//             throw new Error("'id' já existe")
//         }

//         const [userDBExists]: TPostDB[] | undefined[] = await db("posts").where({ id: creatorId })

//         if (userDBExists) {
//             res.status(400)
//             throw new Error("'id' já existe")
//         }

//         const newPost = new Post(
//             id,
//             creatorId,
//             content,
//             likes,
//             dislikes,
//             new Date().toISOString(),
//             new Date().toISOString()
//         )

//         const newPostDB = {
//             id: newPost.getId(),
//             creator_id: newPost.getCreatorId(),
//             content: newPost.getContent(),
//             likes: newPost.getLikes(),
//             dislikes: newPost.getDislikes(),
//             created_at: newPost.getCreatedAt(),
//             updated_at: newPost.getUpdatedAt()
//         }

//         await db("posts").insert(newPostDB)

//         res.status(201).send("postagem realizada com sucesso")
//     } catch (error) {
//         console.log(error)

//         if (req.statusCode === 200) {
//             res.status(500)
//         }

//         if (error instanceof Error) {
//             res.send(error.message)
//         } else {
//             res.send("Erro inesperado")
//         }
//     }
// })


