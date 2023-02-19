import { PostDB, PostModel } from "../types"

export class Post {
    constructor(
        private id: string,
        private content: string,
        private likes: number,
        private dislikes: number,
        private createdAt: string,
        private updatedAt: string,
        private creatorId: string,
        private creatorName: string,
    ) { }

   
    getId(): string{
        return this.id
    }

    getCreatorId(): string{
        return this.creatorId
    }

    setCreatorId(value: string): void{
        this.creatorId = value
    }

    getContent(): string{
        return this.content
    }

    setContent(value: string): void{
        this.content = value
    }

    getLikes(): number{
        return this.likes
    }

    setLikes(value: number): void{
        this.likes = value
    }

    getDislikes(): number{
        return this.dislikes
    }

    setDislikes(value: number): void{
        this.dislikes = value
    }

    getCreatedAt(): string{
        return this.createdAt
    }

    setCreatedAt(value: string){
        this.createdAt = value
    }

    getUpdatedAt(): string{
        return this.updatedAt
    }

    setUpdatedAt(value: string): void{
        this.updatedAt = value
    }


    public toBusinessModel(): PostModel {
        return {
            id: this.id,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            creator: {
                id: this.creatorId,
                name: this.creatorName
            }
        }
    }


public toDBModel(): PostDB {
    return {
        id: this.id,
        content: this.content,
        likes: this.likes,
        dislikes: this.dislikes,
        created_at: this.createdAt,
        updated_at: this.updatedAt,
        creator_id: this.creatorId,
    }
}}
