import { UserModel } from "../types"

export interface GetUsersInput {
    q: unknown
}

export type GetUsersOutput = UserModel[]

export interface SignupInput {
    // id: unknown,
    name: unknown,
    email: unknown,
    password: unknown
}

export interface SignupOutput {
    message: string,
    token: string
}

export interface LoginInput {
    email: unknown,
    password: unknown
}

export interface LoginOutput {
    message: string,
    token: string
}