import path from 'path';
import fs from 'fs';
import { logger } from '../logger/logger';
import { DB } from '../model/index';

export const runSeeders = async (sequelizeInstance, organization) => {
    const queryInterface = sequelizeInstance.getQueryInterface();
    const seederPath = path.join(__dirname, '../../seeders');
    const seederFiles = fs.readdirSync(seederPath);
    await Promise.all(
        seederFiles.map(async (seederFile) => {
            const fullPath = path.join(seederPath, seederFile);
            const existingSeeder = await DB[organization].seedersModel.findOne({
                where: {
                    name: fullPath,
                },
            });
            if (!existingSeeder) {
                const seeder = await import(fullPath);
                if (seeder && seeder.up) {
                    try {
                        await seeder.up(queryInterface);
                        await DB[organization].seedersModel.create({
                            name: fullPath,
                        });
                        return true;
                    } catch (error) {
                        logger.info(
                            `Error running seeder ${seederFile} for ${organization}:`,
                            error,
                        );
                    }
                }
            } else {
                return true;
            }
        }),
    );
};
