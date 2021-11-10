import { Request, response, Response } from 'express';
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"


class AuthenticateUserController {

    async handle(req: Request, res: Response) {
        const { username, password } = req.body;

        const authenticateUserUseCase = new AuthenticateUserUseCase();
        const token = await authenticateUserUseCase.execute({ password, username });

        return res.status(200).json(token);
    }
}

export { AuthenticateUserController }