const { Model, DataTypes } = require('sequelize');
const connection = require('../config/connection');
const R = sequelize.define('Roles');
const D = sequelize.define('Departments');

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