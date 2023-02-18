
import { PostModel } from './../types';

export interface GetPostsInput {
    q: string,
    token: string | undefined
}

export type GetPostsOutput = PostModel[]

export interface GetPostInputDTO {
    token: string | undefined
}

export interface CreatePostInputDTO {

    token: string | undefined
    content: unknown,

}

export interface CreatePostOutput {
    content: string
}


export interface DeletePostInputDTO {
    idToDelete: string,
    token: string | undefined
}

export interface EditPostInputDTO {
    idToEdit: string,
    token: string | undefined,
    content: unknown
}
