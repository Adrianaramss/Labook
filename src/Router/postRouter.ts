import express from 'express'
import { PostController } from "../controller/Postcontroller"

export const postRouter = express.Router()
// const userController = new UserController()
const postController = new PostController ()

postRouter.get("/",  postController.getPosts)

postRouter.post("/", postController.createPosts)

postRouter.delete("/:id", postController.deletePosts)

postRouter.put("/:id", postController.updatePosts)