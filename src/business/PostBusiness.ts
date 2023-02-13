import { PostDatabase } from "../database/PostDatabase"
import { BadRequestError } from "../errors/BadRequestError"
import { Post } from "../models/post"
import { PostDB } from "../types"


export class PostBusiness {
    public getPosts = async (q: string | undefined) => {
            const postDatabase = new PostDatabase()
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
        return posts
    }

    public createPosts = async (input:any) => {
       
            const { id, creatorId, content, likes, dislikes } = input

            if (typeof id !== "string") {
                throw new BadRequestError("'id' deve ser string")
            }

            if (typeof creatorId !== "string") {
                throw new BadRequestError("'creatorId' deve ser string")
            }

            if (typeof content !== "string") {
                throw new BadRequestError("'content' deve ser string")
            }

            if (typeof likes !== "number") {
                throw new BadRequestError("'likes' deve ser number")
            }

            if (typeof dislikes !== "number") {
                throw new BadRequestError("'dislikes' deve ser bolean")
            }

         
            const postDatabase = new PostDatabase()
            const userDBExists = await postDatabase.findPostById(id)

            if (userDBExists) {
                throw new BadRequestError("'id' já existe")
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

            const newPostDB : PostDB = {
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
                // const deletePost = new Post(
                //     postExist.id,
                //     postExist.creator_id,
                //     postExist.content,
                //     postExist.likes,
                //     postExist.dislikes,
                //     postExist.created_at,
                //     postExist.updated_at,
    
    
                // )
    
                await postDBInstance.deletePost(id)
    
                const outPut = {
                    message: "Postagem deletada",
                }
        
                return outPut
            }

            public updatePosts = async (input:any) => {
             
        
                    const {id, content, likes,dislikes } = input
        
                    const postDatabase = new PostDatabase()
        
                    if (id !== undefined) {
                        if (typeof id !== "string") {
                            throw new BadRequestError("'id' deve ser string")
                        }
                    }
        
                    const postExist = await postDatabase.findPostById(id)
        
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
        
                 await   postDatabase.updatePosts(newPostDB, id)
        
        
                 const outPut = {
                    message: "Postagem atualizada",
                    post: newPost
                }
        
                return outPut
            }
}




        
