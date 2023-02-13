import { Request, Response } from "express"
import { PostDatabase } from "../database/PostDatabase"
import { Post } from "../models/post"
import {  UpdatedPost } from "../types"
import {PostBusiness} from "../business/PostBusiness"
import { BaseError } from "../errors/BaseError"

export class PostController {
    public getPosts = async (req: Request, res: Response) => {
        try {

            const q = req.query.q as string | undefined

            const postDatabase = new PostDatabase()
            const postsDB = await postDatabase.findPosts(q)


            // const posts: Post[] = postsDB.map((postDB) => new Post(
            //     postDB.id,
            //     postDB.creator_id,
            //     postDB.content,
            //     postDB.likes,
            //     postDB.dislikes,
            //     postDB.created_at,
            //     postDB.updated_at
            // ))

            res.status(200).send(postsDB)
        } catch (error) {
            console.log(error)

            // if (req.statusCode === 200) {
            //     res.status(500)
            // }

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)

            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public createPosts = async (req: Request, res: Response) => {
        try {
            const input = {
                id: req.body.id,
                creatorId: req.body.creatorId,
                content: req.body.content,
                likes: req.body.likes,
                dislikes: req.body.dislikes
            
            }

           
            const postBussiness = new PostBusiness()
            const output = await postBussiness.createPosts(input)

            res.status(201).send(output)
        } catch (error) {
            console.log(error)

            // if (req.statusCode === 200) {
            //     res.status(500)
            // }

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)

            } else {
                res.send("Erro inesperado")
            }
        }
    }

    deletePosts = async (req: Request, res: Response) => {
        try {
            const input = {id: req.params.id}
            const postBusiness= new PostBusiness()
            const outPut = await postBusiness.deletePost(input)


            res.status(200).send(outPut)
        } catch (error) {
            console.log(error)

            // if (req.statusCode === 200) {
            //     res.status(500)
            // }

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)

            } else {
                res.send("Erro inesperado")
            }
        }
    }



    public updatePosts = async (req: Request, res: Response) => {
        try {
            const input = {
                id: req.params.id,
                content: req.body.content,
                likes: req.body.likes,
                dislikes: req.body.dislikes
            }

            const postBusiness = new PostBusiness()
            const outPut = await postBusiness.updatePosts(input)

            res.status(200).send(outPut)

        } catch (error) {
            console.log(error)

            // if (req.statusCode === 200) {
            //     res.status(500)
            // }

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)

            } else {
                res.send("Erro inesperado")
            }
        }
    }
}