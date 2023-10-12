import { Sequelize, Dialect } from 'sequelize';
import dotenv from 'dotenv';
import { logger } from '../logger/logger';
import { sequelizeConfigs } from './databasestore';
dotenv.config({ path: './.env' });

interface DBConfig {
  DB_NAME: string | undefined;
  DB_USER: string | undefined;
  DB_PASSWORD: string | undefined;
  DB_HOST: string | undefined;
  DB_DIALECT: string | undefined;
  DB_PORT: number;
}

const dbConfig: DBConfig = {
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_DIALECT: process.env.DB_DIALECT,
    DB_PORT: Number(process.env.DB_PORT),
};

export const sequelize = new Sequelize(
    dbConfig.DB_NAME || '',
    dbConfig.DB_USER || '',
    dbConfig.DB_PASSWORD,
    {
        host: dbConfig.DB_HOST,
        dialect: dbConfig.DB_DIALECT as Dialect,
        port: dbConfig.DB_PORT,
        logging:false
    },
);

(async () => {
    try {
        await sequelize.authenticate();
        logger.info('👍 MASTERDB Connection has been established successfully.');
    } catch (error) {
        logger.error(`👎🏼 Unable to connect to the database: ${error}`);
    }
})();



export function getSequelizeInstance(organization) {
    if (sequelizeConfigs.hasOwnProperty(organization)) {
        const orgConfig = sequelizeConfigs[organization];
        const sequelize = new Sequelize(
            orgConfig.DB_NAME,
            orgConfig.DB_USER,
            orgConfig.DB_PASSWORD,
            {
                host: orgConfig.host,
                dialect: orgConfig.dialect as Dialect,
                port: orgConfig.port,
                logging: false,
            }
        );
        (async () => {
            try {
                await sequelize.authenticate();
                logger.info(`👍 Connection has been established  ${orgConfig.DB_NAME} successfully. `);
            } catch (error) {
                logger.error(`👎🏼 Unable to connect to the database: ${error}`);
            }
        })();
        return sequelize;
    } else {
        throw new Error(`Organization '${organization}' not found in configSequlize.`);
    }
}
