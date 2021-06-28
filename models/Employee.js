const { Sequelize, Model, DataTypes } = require('connection');
const connection = require('../config/connection');
const sequelize = new Sequelize();

class Employee extends Model {}

Employee.init({
    firstName: {
        type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING,
    },
    roleId: {
        type: DataTypes.INTEGER,
    },
    managerId: {
        type: DataTypes.INTEGER,
    },
    fullName: {
        type: DataTypes.VIRTUAL,
        get() {
            return `${this.firstName} ${this.lastName}`;
        },
        set(value) {
            throw new Error('Do not try to set the `fullName` value!');
        }
    }
}, {
    connection,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Employees',
});

module.exports = Employee;