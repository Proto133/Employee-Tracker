const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

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
    sequelize,
    timestamps: false,
    freezeTableName: false,
    underscored: true,
    modelName: 'Role',
});

module.exports = Role;