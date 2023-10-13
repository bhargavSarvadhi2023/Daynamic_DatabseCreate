import { userValidation } from '../../validation/basic.Validation';
import { dynamicControllers } from '../../controller/index';
import BaseRoute from '../base.routes';

class AuthRoutes extends BaseRoute {
    async initializeRoutes() {
        this.router.post('/login', dynamicControllers.authController.login);
        this.router.post(
            '/signup',
            userValidation,
            dynamicControllers.userController.create.bind(
                dynamicControllers.userController,
            ),
        );
        this.router.post(
            '/otp',
            dynamicControllers.authController.forgetPassword,
        );
        this.router.post(
            '/checkvalidateotp',
            dynamicControllers.authController.checkValidateOtp,
        );
        this.router.put(
            '/reset-password',
            dynamicControllers.authController.resetPassword,
        );
    }
}
export const authRoutes = new AuthRoutes().router;
