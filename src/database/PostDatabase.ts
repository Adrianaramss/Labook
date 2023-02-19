import { Post } from "../models/post";
import { PostDB, UpdatedPost } from "../types";
import { BaseDatabase } from "../database/BaseDatabase"
import { PostCreatorDB } from "../types";
export class PostDatabase extends BaseDatabase {
    public static TABLE_POSTS = "posts"


    public getPostCreators = async (): Promise<PostCreatorDB[]> => {
        const result: PostCreatorDB[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .select(
                "posts.id",
                "posts.content",
                "posts.creator_id",
                "posts.likes",
                "posts.dislikes",
                "posts.created_at",
                "posts.updated_at",
                "users.name AS creator_name"
            )
            .join("users", "posts.creator_id", "=", "users.id")
        
        return result
    }

   
    public insert = async (postDB: PostDB): Promise<void> => {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .insert(postDB)
    }

    public delete = async (id: string): Promise<void> => {
        await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
            .delete()
            .where({ id })
    }

    public findById = async (id: string): Promise<PostDB | undefined> => {
        const result: PostDB[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .select()
            .where({ id })
        
        return result[0]
    }

    public update = async (
        idToEdit: string,
        postDB: PostDB
    ): Promise<void> => {
        // console.log(postDB)
        await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
            .update(postDB)
            .where({ id : idToEdit })
    }
}