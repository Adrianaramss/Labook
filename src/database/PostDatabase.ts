import { Post } from "../models/post";
import { PostDB, UpdatedPost } from "../types";
import { BaseDatabase } from "../database/BaseDatabase"

export class PostDatabase extends BaseDatabase {
    public static TABLE_POSTS = "posts"

    public async findPosts(q: string | undefined) {
        let postsDB

        if (q) {
            const result: PostDB[] = await BaseDatabase
                .connection(PostDatabase.TABLE_POSTS)
                .where("content", "LIKE", `%${q}%`)

            postsDB = result
        } else {
            const result: PostDB[] = await BaseDatabase
                .connection(PostDatabase.TABLE_POSTS)

            postsDB = result
        }

        return postsDB
    }


    public async findPostById(id: string) {
        const [postDB]: PostDB[] | undefined[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .where({ id })

        return postDB
    }


    public async insertPost(newPostDB: PostDB) {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .insert(newPostDB)
    }

    public async deletePost(id: string): Promise<void> {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .del()
            .where({ id })
    }

    public async updatePosts(newPostDB: UpdatedPost, id: string): Promise<void> {
        await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
            .update(newPostDB)
            .where({ id })
    }

}