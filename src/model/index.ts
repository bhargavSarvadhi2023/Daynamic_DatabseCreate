import { Sequelize } from 'sequelize';
import { getSequelizeInstance, sequelize } from '../config/database';
import AppError from '../utils/appError';
import { ERRORTYPES } from '../constant/errorTypes';
import { sequelizeConfigs } from '../config/databasestore';
import { runSeeders } from '../utils/sequelize.seeders';
import path from 'path';
import { DaynamicImport } from '../utils/daynamicImport';

const folderPath = path.join(__dirname);
const excludedFiles = ['index.ts'];
export const dynamicModels = DaynamicImport(folderPath, excludedFiles) as any;
const userModel = dynamicModels.userModel;
const otpModel = dynamicModels.otpModel;
const organizationSchema = dynamicModels.organizationSchema;
export const db = {
    Sequelize,
    sequelize,
    userModel,
    otpModel,
    organizationSchema,
};
db.sequelize.sync();

console.time('using latest loop');

export const DB = {};
const createDb = async (organization) => {
    const instance = getSequelizeInstance(organization);
    const userModel = dynamicModels.defineUserModel(instance);
    const otpModel = dynamicModels.defineOtpModel(instance);
    DB[organization] = {
        Sequelize,
        sequelize: instance,
        userModel,
        otpModel,
    };
    await instance.sync();
    // await runSeeders(instance, organization);  -----------------------------..>>>>>>>>>>>>>>> for seeders
    for (const modelName in DB[organization]) {
        if (DB[organization][modelName].associate) {
            DB[organization][modelName].associate(DB[organization]);
        }
    }
};

async function CreateDatabase_Connections() {
    try {
        const organizations = Object.keys(sequelizeConfigs);
        await Promise.all(organizations.map(createDb));
    } catch (error) {
        throw new AppError(error.message, ERRORTYPES.UNKNOWN_ERROR);
    }
}

CreateDatabase_Connections();

console.timeEnd('using latest loop');
