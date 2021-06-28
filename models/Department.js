const { Sequelize, Model, DataTypes } = require('sequelize');
const connection = require('../config/connection');
const sequelize = new Sequelize();

class Department extends Model {}

Department.init({
    deptName: {
        type: DataTypes.STRING,
    }
}, {
    connection,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Departments',
});

module.exports = Department;