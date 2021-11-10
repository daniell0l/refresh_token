import { client } from "../../prisma/client"
import { hash } from "bcryptjs"
import { User } from "@prisma/client";

interface IUserRequest {
    name: string; 
    username: string;
    password: string;
}
class CreateUserUseCase {
    async execute({ name, username, password }: IUserRequest): Promise<User> {
        try {
            const userAlreadyExists = await client.user.findFirst({
                where: { username }
            })
            if (userAlreadyExists) { 
                throw new Error(`User ${username} already exists`)
            }
            const passwordHash = await hash(password, 8);

            const user = await client.user.create({
                data: {
                    name,
                    password: passwordHash,
                    username
                }
            })
            return user
        } catch (err) {
            console.error("UseCase: " + err.message)
        }
    }
}

export { CreateUserUseCase }