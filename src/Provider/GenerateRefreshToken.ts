import { client } from "../prisma/client"
import dayjs from "dayjs"

class GenerateRefreshToken {
    async execute(userId: string) {

        const expireIn = dayjs().add(15, "second").unix();

        const generateRefreshToken = await client.refreshToken.create({
            data: {
                userId,
                expireIn: expireIn
            }
        })

        return generateRefreshToken
    }
}

export { GenerateRefreshToken }