import { Request, Response } from "express"
import { PostDatabase } from "../database/PostDatabase"
import { Post } from "../models/post"
import {  UpdatedPost } from "../types"
import {PostBusiness} from "../business/PostBusiness"
import { BaseError } from "../errors/BaseError"
import { CreatePostInputDTO, EditPostInputDTO, GetPostsInput } from "../dtos/PostDTO"
import { DeletePostInputDTO } from "../dtos/PostDTO"



export class PostController {
    constructor(
      private postBusiness: PostBusiness
  ){}

  public getPosts = async (req: Request, res: Response) => {
    try {
          const input: GetPostsInput = {
              q: req.query.q as string,
              token: req.headers.authorization
          }

          const output = await this.postBusiness.getPosts(input)

          res.status(200).send(output)

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

  public createPost = async (req: Request, res: Response) => {
    try {
        const input: CreatePostInputDTO = {
            token: req.headers.authorization,
            content: req.body.content
        }
   await this.postBusiness.createPosts(input)

        res.status(201).end()
    } catch (error) {
        console.log(error)
        if (error instanceof BaseError) {
            res.status(error.statusCode).send(error.message)
        } else {
            res.status(500).send("Erro inesperado")
        }
    }
}


public editPost = async (req: Request, res: Response) => {
    try {
        const input: EditPostInputDTO = {
            idToEdit: req.params.id,
            content: req.body.content,
            token: req.headers.authorization

        }
        await this.postBusiness.editPost(input)

        res.status(201).end()
    } catch (error) {
        console.log(error)
        if (error instanceof BaseError) {
            res.status(error.statusCode).send(error.message)
        } else {
            res.status(500).send("Erro inesperado")
        }
    }
}


public deletePost = async (req: Request, res: Response) => {
    try {
        const input: DeletePostInputDTO = {
            idToDelete: req.params.id,
            token: req.headers.authorization
        }

        await this.postBusiness.deletePost(input)

        res.status(200).end()
    } catch (error) {
        console.log(error)
        if (error instanceof BaseError) {
            res.status(error.statusCode).send(error.message)
        } else {
            res.status(500).send("Erro inesperado")
        }
    }
}

}