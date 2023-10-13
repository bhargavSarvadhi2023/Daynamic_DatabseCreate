import { userValidation } from '../../validation/basic.Validation';
import { dynamicControllers } from '../../controller';
import BaseRoute from '../base.routes';

class UserRoutes extends BaseRoute {
    async initializeRoutes() {
        this.router.get(
            '/',
            dynamicControllers.userController.getData.bind(
                dynamicControllers.userController,
            ),
        );
        this.router.delete(
            '/:id',
            dynamicControllers.userController.delete.bind(
                dynamicControllers.userController,
            ),
        );
        this.router.put(
            '/:id',
            userValidation,
            dynamicControllers.userController.update.bind(
                dynamicControllers.userController,
            ),
        );
        this.router.post(
            '/organizations',
            dynamicControllers.organizationController.create.bind(
                dynamicControllers.organizationController,
            ),
        );
        this.router.put(
            '/organizations/active/:id',
            dynamicControllers.organizationController.createDynmaciorg,
        );
    }
}
export const userRoutes = new UserRoutes().router;
