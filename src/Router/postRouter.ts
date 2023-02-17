import express from 'express'
import { PostController } from "../controller/Postcontroller"
import { PostBusiness } from '../business/PostBusiness'
import { PostDatabase } from '../database/PostDatabase'
import { IdGenerator } from '../services/IdGenerator'
import { TokenManager } from '../services/TokenManager'
import { PostDTO } from '../dtos/PostDTO'
export const postRouter = express.Router()
// const userController = new UserController()
const postController = new PostController(
    new PostDTO(),
    new PostBusiness(
        new PostDatabase
    )
)

postRouter.get("/",  postController.getPosts)

postRouter.post("/", postController.createPosts)

postRouter.delete("/:id", postController.deletePosts)

postRouter.put("/:id", postController.updatePosts)