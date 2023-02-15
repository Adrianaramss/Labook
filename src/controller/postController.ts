import { Request, Response } from "express"
import { PostDatabase } from "../database/PostDatabase"
import { Post } from "../models/post"
import {  UpdatedPost } from "../types"
import {PostBusiness} from "../business/PostBusiness"
import { BaseError } from "../errors/BaseError"
import { PostDTO } from "../dtos/PostDTO"

export class PostController {
      constructor(
        private postDTO: PostDTO,
        private postBusiness: PostBusiness
    ){}


    public getPosts = async (req: Request, res: Response) => {
        try {

            const q = req.query.q as string | undefined

            const postsDB = await this.postBusiness.getPosts(q)
            res.status(200).send(postsDB)
        } catch (error) {
            console.log(error)


            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)

            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public createPosts = async (req: Request, res: Response) => {
        try {
            const input = this.postDTO.createPostInput (

                req.body.id,
                req.body.creator_id,
                req.body.content,
                req.body.likes,
                req.body.dislikes
            
            )

           
            const output = await this.postBusiness.createPosts(input)

            res.status(201).send(output)
        } catch (error) {
            console.log(error)

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
            const outPut = await this.postBusiness.deletePost(input)


            res.status(200).send(outPut)
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)

            } else {
                res.send("Erro inesperado")
            }
        }
    }



    public updatePosts = async (req: Request, res: Response) => {
        try {
            const input = this.postDTO.editPostInput (
                req.params.id,
                req.body.creatorId,
                req.body.content,
                req.body.likes,
                req.body.dislikes
            )

            const outPut = await this.postBusiness.updatePosts(input)

            res.status(200).send(outPut)

        } catch (error) {
            console.log(error)


            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)

            } else {
                res.send("Erro inesperado")
            }
        }
    }
}