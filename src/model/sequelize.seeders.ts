import { DataTypes } from 'sequelize';

export const defineSeedersModel = (sequelize) => {
    const seedersModel = sequelize.define('seeders', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    });

    return seedersModel;
};
