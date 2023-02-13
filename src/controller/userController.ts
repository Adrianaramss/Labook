import { Request,Response } from "express"
import { UserBusiness } from "../business/UserBusiness"
import { UserDatabase } from "../database/UserDatabase"
import { User } from "../models/User"
import { UserDB } from "../types"

export class UserController {

public getUsers = async (req: Request, res: Response) => {

    try {
        const q = req.query.q as string | undefined

        const userDatabase = new UserDatabase()
        const usersDB = await userDatabase.findUsers(q)

        // const users: User[] = usersDB.map((userDB) => new User(
        //     userDB.id,
        //     userDB.name,
        //     userDB.email,
        //     userDB.password,
        //     userDB.role,
        //     userDB.created_at
        // ))

        res.status(200).send(usersDB)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
}
public createUser = async (req: Request, res: Response) => {
    try {
        const input = {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        }

        const userBusiness = new UserBusiness()
        const output = await userBusiness.createUser(input)

        res.status(201).send(output)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
}


}