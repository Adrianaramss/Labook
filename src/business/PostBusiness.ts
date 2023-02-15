import { PostDatabase } from "../database/PostDatabase"
import { BadRequestError } from "../errors/BadRequestError"
import { Post } from "../models/post"
import { PostDB } from "../types"
import {EditPostInputDTO, PostDTO} from "../dtos/PostDTO"
import { CreatePostInputDTO } from "../dtos/PostDTO"

export class PostBusiness {
    findPosts: any
    constructor (
        private postDatabase: PostDatabase
    ){}

    public getPosts = async (q: string | undefined) => {
            const postsDB = await this.postDatabase.getPosts(q)

            const posts: Post[] = postsDB.map((postDB) => new Post(
                postDB.id,
                postDB.creator_id,
                postDB.content,
                postDB.likes,
                postDB.dislikes,
                postDB.created_at,
                postDB.updated_at
            ))
        return posts
    }

    public createPosts = async (input:CreatePostInputDTO) => {
       
            const { id, creator_id, content, likes, dislikes } = input

        
            const userDBExists = await this.postDatabase.findPostById(id)

            if (userDBExists) {
                throw new BadRequestError("'id' já existe")
            }

            const newPost = new Post(
                id,
                creator_id,
                content,
                likes,
                dislikes,
                new Date().toISOString(),
                new Date().toISOString()
            )

            const newPostDB : PostDB = {
                id: newPost.getId(),
                creator_id: newPost.getCreatorId(),
                content: newPost.getContent(),
                likes: newPost.getLikes(),
                dislikes: newPost.getDislikes(),
                created_at: newPost.getCreatedAt(),
                updated_at: newPost.getUpdatedAt()
            }

            await this.postDatabase.insertPost(newPostDB)

    
            const output = {
                message: "Postagem realizada",
                user: content
            }
        
            return output
        
        }

       public deletePost = async (input: any) => {
        
                const { id } = input
                const postDBInstance = new PostDatabase()
    
    
                const postExist = await postDBInstance.findPostById(id)
                if (!postExist) {
                    throw new BadRequestError("'id' não encontrado ")
                }
            
    
                await postDBInstance.deletePost(id)
    
                const outPut = {
                    message: "Postagem deletada",
                }
        
                return outPut
            }

            public updatePosts = async (input:EditPostInputDTO) => {
             
        
                    const {idToEdit, content, likes,dislikes } = input
        
        
                    if (idToEdit !== undefined) {
                        if (typeof idToEdit !== "string") {
                            throw new BadRequestError("'id' deve ser string")
                        }
                    }
        
                    const postExist = await this.postDatabase.findPostById(idToEdit)
        
                    if (!postExist) {
                        throw new BadRequestError("post não encontrado")
                    }
        
                    const newPost = new Post(
                        postExist.id,
                        postExist.creator_id,
                        postExist.content,
                        postExist.likes,
                        postExist.dislikes,
                        postExist.created_at,
                        postExist.updated_at,
                    )
        
                    if (content !== undefined) {
                        if (typeof content !== "string") {
                            throw new BadRequestError("'content' deve ser string");
                        }
                        newPost.setContent(content)
                        newPost.setUpdatedAt(new Date().toISOString())
                    }
        
                    if (likes !== undefined) {
                        if (typeof likes !== "number") {
                            throw new BadRequestError("'likes' deve ser number")
                        }
                        newPost.setLikes(likes)
                        newPost.setUpdatedAt(new Date().toISOString())
                    }
        
                    if (dislikes !== undefined) {
                        if (typeof dislikes !== "number") {
                            throw new BadRequestError("'dislikes' deve ser number")
                        }
                        newPost.setDislikes(dislikes)
                        newPost.setUpdatedAt(new Date().toISOString())
                    }
        
                    const newPostDB: PostDB = {
                        id: newPost.getId(),
                        creator_id: newPost.getCreatorId(),
                        content: newPost.getContent(),
                        likes: newPost.getLikes(),
                        dislikes: newPost.getDislikes(),
                        created_at: newPost.getCreatedAt(),
                        updated_at: newPost.getUpdatedAt()
                    }
        
                 await this.postDatabase.updatePosts(newPostDB, idToEdit)
        
                 
                 const outPut = {
                    message: "Postagem atualizada",
                    post: newPost
                }
        
                return outPut
            }
}




        
