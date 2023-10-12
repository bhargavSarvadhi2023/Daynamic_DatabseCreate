import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export const organizationSchema = sequelize.define('organization', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    organizationName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    industry: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    website: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    contact: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    numberOfEmployees: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
});
