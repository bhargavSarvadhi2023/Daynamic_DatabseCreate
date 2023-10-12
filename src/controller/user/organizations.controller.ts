import { ApplicationController } from '../base.application.controller';
import { db } from '../../model/index';
import { sequelizeConfigs } from '../../config/databasestore';
import { Pool } from 'pg';
import path from 'path';
import fs from 'fs';
import { ERRORTYPES, RES_TYPES } from '../../constant';
import AppError from '../../utils/appError';

class OrganizationController extends ApplicationController {
    constructor() {
        super(db.organizationSchema);
    }

    async createDynmaciorg(req, res, next) {
        try {
            const { id } = req.params;
            const data = await db.organizationSchema.findOne({
                where: { id },
            });
            if (data['isActive'] == true) {
                throw new AppError(RES_TYPES.BAD_URL, ERRORTYPES.UNKNOWN_ERROR);
            }
            const dataBase = await organizationController.CreateDatabase(
                `${data['organizationName']}_DAYNAMIC_DB`,
            );
            const update = await db.organizationSchema.update(
                { isActive: true },
                {
                    where: { id },
                },
            );
            return res
                .status(200)
                .json({ success: true, message: RES_TYPES.UPDATE });
        } catch (error) {
            return next(error);
        }
    }

    async CreateDatabase(databasename) {
        try {
            const newConfig = {
                DB_NAME: databasename,
                DB_USER: process.env.DB_USER,
                DB_PASSWORD: process.env.DB_PASSWORD,
                host: process.env.DB_HOST,
                dialect: process.env.DB_DIALECT,
                port: Number(process.env.DB_PORT),
            };
            const pool = new Pool({
                database: process.env.DB_NAME,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
            });
            const client = await pool.connect();
            await client.query(`CREATE DATABASE "${databasename}"`);
            client.release();
            const orgKey = `org${Object.keys(sequelizeConfigs).length + 1}`;
            sequelizeConfigs[orgKey] = newConfig;
            const configFileContent = `export const sequelizeConfigs = ${JSON.stringify(
                sequelizeConfigs,
                null,
                2,
            )};`;
            fs.writeFileSync(
                path.join(__dirname, '../../config/databasestore.ts'),
                configFileContent,
            );
            return true;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }
}
export const organizationController = new OrganizationController();
