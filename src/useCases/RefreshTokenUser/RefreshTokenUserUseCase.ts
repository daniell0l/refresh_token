import dayjs from "dayjs"
import { client } from "../../prisma/client";
import { GenerateRefreshToken } from "../../Provider/GenerateRefreshToken";
import { GenerateToken } from "../../Provider/GenerateToken";

class RefreshTokenUserUseCase {
    async execute(refresh_token: string) {
        const refreshToken = await client.refreshToken.findFirst({
            where: {
                id: refresh_token,
            }
        })
        if (!refreshToken) {
            throw new Error("Refresh token invalid");
        }

        const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expireIn))

        const generateToken = new GenerateToken();
        const token = await generateToken.execute(refreshToken.userId);

        if (refreshTokenExpired) {
            await client.refreshToken.deleteMany({
                where: {
                    userId: refreshToken.userId
                }
            })

            const generateRefreshToken = new GenerateRefreshToken();
            const newRefreshToken = await generateRefreshToken.execute(refreshToken.userId);
            return { token, newRefreshToken };
        }
        return token;
    }
}

export { RefreshTokenUserUseCase }