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

public createPosts = async (req: Request, res: Response) => {
        try {
            const { id, creatorId, content, likes, dislikes } = req.body
    
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'id' deve ser string")
            }
    
            if (typeof creatorId !== "string") {
                res.status(400)
                throw new Error("'creatorId' deve ser string")
            }
    
            if (typeof content !== "string") {
                res.status(400)
                throw new Error("'content' deve ser string")
            }
    
            if (typeof likes !== "number") {
                res.status(400)
                throw new Error("'likes' deve ser number")
            }
    
            if (typeof dislikes !== "number") {
                res.status(400)
                throw new Error("'dislikes' deve ser bolean")
            }
    
            // const [postDBExists]: TPostDB[] | undefined[] = await db("posts").where({ id })
    
            // if (postDBExists) {
            //     res.status(400)
            //     throw new Error("'id' já existe")
            // }
    
            // const [userDBExists]: TPostDB[] | undefined[] = await db("posts").where({ id: creatorId })
    
            const postDatabase = new PostDatabase()
            const userDBExists = await postDatabase.findPostById(id)

            if (userDBExists) {
                res.status(400)
                throw new Error("'id' já existe")
            }
    
            const newPost = new Post(
                id,
                creatorId,
                content,
                likes,
                dislikes,
                new Date().toISOString(),
                new Date().toISOString()
            )
    
            const newPostDB = {
                id: newPost.getId(),
                creator_id: newPost.getCreatorId(),
                content: newPost.getContent(),
                likes: newPost.getLikes(),
                dislikes: newPost.getDislikes(),
                created_at: newPost.getCreatedAt(),
                updated_at: newPost.getUpdatedAt()
            }
    
            // await db("posts").insert(newPostDB)
            await postDatabase.insertPost(newPostDB)

            res.status(201).send("postagem realizada com sucesso")
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

    deletePosts = async (req: Request, res: Response) => {
        try {
          const { id } = req.params
          const postDBInstance = new PostDatabase()
    
          if (id !== undefined) {
            if (typeof id !== "string") {
              res.status(400)
              throw new Error("'id' deve ser string")
            }
          }
    
          const postExist = await postDBInstance.findPostById(id)
          if (!postExist) {
            res.status(404)
            throw new Error("'id' não encontrado ")
          }
          const deletePost = new Post(
            postExist.id,
            postExist.creator_id,
            postExist.content,
            postExist.likes,
            postExist.dislikes,
            postExist.created_at,
            postExist.updated_at,


          )
    
          await postDBInstance.deletePost(deletePost)
    
          res.status(200).send("Usuário deletado com sucesso")
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