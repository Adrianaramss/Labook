import express from 'express'
import { PostController } from "../controller/Postcontroller"
import { PostDTO } from '../dtos/PostDTO'
import { PostBusiness } from '../business/PostBusiness'
import { PostDatabase } from '../database/PostDatabase'
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