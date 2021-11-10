import { client } from "../../prisma/client";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { GenerateToken } from "../../Provider/GenerateToken";
import { GenerateRefreshToken } from "../../Provider/GenerateRefreshToken";

interface IAuthentication {
    username: string;
    password: string;
}

class AuthenticateUserUseCase {
    async execute({ password, username }: IAuthentication) {
        const userAlreadyExists = await client.user.findFirst({
            where: {
                username,
            }
        })
        if (!userAlreadyExists) {
            throw new Error("User or password incorrect")
        }

        const passwordMatch = await compare(password, userAlreadyExists.password);

        if (!passwordMatch) {
            throw new Error("User or password incorrect")
        }

        const generateToken = new GenerateToken();
        const token = await generateToken.execute(userAlreadyExists.id);

        await client.refreshToken.deleteMany({
            where: {
                userId: userAlreadyExists.id,
            }
        })

        const generateRefreshToken = new GenerateRefreshToken();
        const refreshToken = await generateRefreshToken.execute(userAlreadyExists.id);

        return { token, refreshToken}
    }
}

export { AuthenticateUserUseCase }