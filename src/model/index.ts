import { Sequelize } from 'sequelize';
import { getSequelizeInstance, sequelize } from '../config/database';
import { defineUserModel, userModel } from '../model/userModel';
import { defineOtpModel, otpModel } from './otpModel';
import { organizationSchema } from './organization.model';
import AppError from '../utils/appError';
import { ERRORTYPES } from '../constant/errorTypes';
import { sequelizeConfigs } from '../config/databasestore';

export const db = {
    Sequelize,
    sequelize,
    userModel,
    otpModel,
    organizationSchema,
};
db.sequelize.sync();

export const DB = {};
try {
    for (const organization in sequelizeConfigs) {
        const instance = getSequelizeInstance(organization);
        const userModel = defineUserModel(instance);
        const otpModel = defineOtpModel(instance);
        DB[organization] = {
            Sequelize,
            sequelize: instance,
            userModel,
            otpModel,
        };
        instance.sync();
    }
} catch (error) {
    throw new AppError(error.message, ERRORTYPES.UNKNOWN_ERROR);
}
