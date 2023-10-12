import { userValidation } from '../../validation/basic.Validation';
import { userController } from '../../controller/user/user.controller';
import BaseRoute from '../base.routes';
import { organizationController } from '../../controller/index';

class UserRoutes extends BaseRoute {
    async initializeRoutes() {
        this.router.get('/', userController.getData.bind(userController));
        this.router.delete('/:id', userController.delete.bind(userController));
        this.router.put(
            '/:id',
            userValidation,
            userController.update.bind(userController),
        );
        this.router.post(
            '/organizations',
            organizationController.create.bind(organizationController),
        );
        this.router.put(
            '/organizations/active/:id',
            organizationController.createDynmaciorg,
        );
    }
}
export const userRoutes = new UserRoutes().router;
