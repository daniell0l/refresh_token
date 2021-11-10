import { sign } from "jsonwebtoken";

class GenerateToken {
    async execute(userId: string) {
        const token = sign({}, "faa0f76b-ed35-4760-987b-fd35f094cc31", {
            subject: userId,
            expiresIn: "20s"
        });
        return token;
    }
}

export { GenerateToken }