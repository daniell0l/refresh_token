import { Router, Request, Response } from "express";
import { ensureAuthenticated } from "./src/middlewares/ensureAuthenticated";
import { AuthenticateUserController } from "./src/useCases/authenticateUser/AuthenticateUserController";
import { UserController } from "./src/useCases/CreateUser/UserController";
import { RefreshTokenUserController } from "./src/useCases/RefreshTokenUser/RefreshTokenUserController";

const router = Router();
const userController = new UserController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenUserController = new RefreshTokenUserController();

router.post('/users', userController.handle)
router.post('/login', authenticateUserController.handle);
router.post('/refresk-token', refreshTokenUserController.handle);
router.get('/courses', ensureAuthenticated, (req: Request, res: Response) => {
    res.status(200).json({
        name: "Aula sobre Refresh Token",
        description: "Token valido!"
    })
})

export { router }