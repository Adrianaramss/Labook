import { PostDatabase } from "../database/PostDatabase"
import { BadRequestError } from "../errors/BadRequestError"
import { Post } from "../models/post"
import { PostCreatorDB, PostDB } from "../types"
// import {EditPostInputDTO, PostDTO} from "../dtos/PostDTO"
// import { CreatePostInputDTO } from "../dtos/PostDTO"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { EditPostInputDTO, GetPostsInput } from "../dtos/PostDTO"
import { GetPostsOutput } from "../dtos/PostDTO"
import { CreatePostInputDTO } from "../dtos/PostDTO"
import { CreatePostOutput } from "../dtos/PostDTO"
import { DeletePostInputDTO } from "../dtos/PostDTO"
import { USER_ROLES } from "../types"
import { NotFoundError } from "../errors/NotFoundErro"

export class PostBusiness {
    
    constructor (
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ){}
    public getPosts = async (
        input: GetPostsInput
        ): Promise<GetPostsOutput> => {
        const { q, token } = input

        if (typeof q !== "string" && q !== undefined) {
            throw new BadRequestError("'q' deve ser string ou undefined")
        }

        if (typeof token !== "string"){
            throw new BadRequestError("'token' inválido")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null){
            throw new BadRequestError("'token' inválido")
        }

        const postsDB : PostCreatorDB[] = 
        await this.postDatabase
        .getPostCreators()

        const posts = postsDB.map((PostCreatorDB) => {
            const post = new Post(
                PostCreatorDB.id,
                PostCreatorDB.content,
                PostCreatorDB.likes,
                PostCreatorDB.dislikes,
                PostCreatorDB.created_at,
                PostCreatorDB.updated_at,
                PostCreatorDB.creator_id,
                PostCreatorDB.creator_name


            )

            return post.toBusinessModel()
        })

        const output: GetPostsOutput = posts

        return output
    }


    public createPosts = async (
        input: CreatePostInputDTO
    ): Promise<void> => {
        const { token, content } = input

      

        if (typeof token !== "string"){
            throw new BadRequestError("'token' inválido")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null){
            throw new BadRequestError("'token' inválido")
        }

        if (typeof content !== "string") {
            throw new BadRequestError("'content' deve ser string")
        }

        const id = this.idGenerator.generate()
        const createdAt = new Date().toISOString()
        const updatedAt = new Date().toISOString()
        const creatorId = payload.id
        const creatorName = payload.name

        const post = new Post(
            id,
            content,
            0,
            0,
            createdAt,
            updatedAt,
            creatorId,
            creatorName
        )

        const postDB = post.toDBModel()

        await this.postDatabase.insert(postDB)
      
    }



    public editPost = async (
        input: EditPostInputDTO
    ): Promise<void> => {

        const {idToEdit, token, content } = input

    
        if (typeof token !== "string"){
            throw new BadRequestError("'token' inválido")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null){
            throw new BadRequestError("'token' inválido")
        }

        if (typeof content !== "string") {
            throw new BadRequestError("'content' deve ser string")
        }
       
        
        const postDB = await this.postDatabase.findById(idToEdit)

        if (!postDB) {
            throw new NotFoundError("'id' não encontrado")
        }

        const creatorId = payload.id

        if (postDB.creator_id !== creatorId) {
            throw new BadRequestError("somente quem criou a post pode editar")
        }

        const creatorName = payload.name

        const post = new Post(
        postDB.id,
        postDB.content,
        postDB.likes,
        postDB.dislikes,
        postDB.created_at,
        postDB.updated_at,
        creatorId,
        creatorName

        )

        post.setContent(content)
        post.setUpdatedAt(new Date().toISOString())

        const updatePostDB = post.toDBModel()

        await this.postDatabase.update(idToEdit, updatePostDB)
      
    }



    public deletePost = async (
        input: DeletePostInputDTO
    ): Promise<void> => {
        const { idToDelete, token } = input

        if (token === undefined) {
            throw new BadRequestError("token ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("token inválido")
        }

        const postDB = await this.postDatabase.findById(idToDelete)

        if (!postDB) {
            throw new NotFoundError("'id' não encontrado")
        }

        const creatorId = payload.id

        if (
            payload.role !== USER_ROLES.ADMIN
            && postDB.creator_id !== creatorId
        ) {
            throw new BadRequestError("somente quem criou a postagem pode deletar ")
        }

        await this.postDatabase.delete(idToDelete)
    }



}