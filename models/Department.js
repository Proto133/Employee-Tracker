const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Department extends Model {}

Department.init({
    deptName: {
        type: DataTypes.STRING,
    }
}, {
    sequelize,
    timestamps: false,
    freezeTableName: false,
    underscored: true,
    modelName: 'department',
});

module.exports = Department;