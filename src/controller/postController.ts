import { Request,Response } from "express"
import { PostDatabase} from "../database/PostDatabase"
import { Post } from "../models/post"

export class PostController {
public getPosts =  async (req: Request, res: Response) => {
    try {


        const q = req.query.q as string | undefined

        const   postDatabase = new PostDatabase()
        const postsDB = await postDatabase.findPosts(q)


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
}
}