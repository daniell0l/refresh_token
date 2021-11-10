import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';

class UserController {

    async handle(req: Request, res: Response) {
        try {
            const authenticateUserUseCase = new CreateUserUseCase();
            const { name, username, password } = req.body;
            const user = await authenticateUserUseCase.execute({
                name,
                username,
                password
            })

            return res.status(201).json(user);

        } catch (err) {
            console.log("Controller: ",err);
        }
    }
}

export { UserController }