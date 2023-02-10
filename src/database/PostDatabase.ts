import { Post } from "../models/post";
import { TPostDB, UpdatedPost } from "../types";
import { BaseDatabase } from "../database/BaseDatabase"

export class PostDatabase extends BaseDatabase {
    public static TABLE_POSTS = "posts"

    public async findPosts(q: string | undefined) {
        let postsDB

        if (q) {
            const result: TPostDB[] = await BaseDatabase
                .connection(PostDatabase.TABLE_POSTS)
                .where("content", "LIKE", `%${q}%`)

            postsDB = result
        } else {
            const result: TPostDB[] = await BaseDatabase
                .connection(PostDatabase.TABLE_POSTS)

            postsDB = result
        }

        return postsDB
    }


    public async findPostById(id: string) {
        const [postDB]: TPostDB[] | undefined[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .where({ id })

        return postDB
    }


    public async insertPost(newPostDB: TPostDB) {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .insert(newPostDB)
    }

    async deletePost(parameter: Post): Promise<void> {
        await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
            .delete()
            .where({ id: parameter.getId() })
    }


    public async updatePosts(newPostDB: UpdatedPost, id: string): Promise<void> {
        await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
            .update(newPostDB)
            .where({ id })
    }

}