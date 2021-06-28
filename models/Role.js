const { Sequelize, Model, DataTypes } = require('sequelize');
const connection = require('../config/connection');
const sequelize = new Sequelize();

class Role extends Model {}

Role.init({
    title: {
        type: DataTypes.STRING,
    },

    salary: {
        type: DataTypes.INTEGER,
    },

    deptId: {
        type: DataTypes.INTEGER,
    },
}, {
    connection,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Roles',
});

R.hasOne(D, { foreignKey: { name: 'deptId' } })



module.exports = Role;