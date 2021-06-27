/* #region Imports */
const png = require('console-png');
const image = require('fs').readFileSync(__dirname + '/images/ETLogo2.png');
const inq = require('inquirer');
const Sequelize = require('./config/connection');
const Employee = require('./models/Employee');
const Dept = require('./models/Department');
const Role = require('./models/Role');
/* #endregion */



// View employees, view departments, view roles, add employee, add department, add role, update role, update manager, 
/* #region Console Image */
// view employees by manager, delete employee, delete role, delete department, quit
function init() {
    png(image, function(err, string) {
        if (err) throw err;
        console.log(string);
        greeting();
    })
};
/* #endregion */

/* #region Greeting and Main Prompt */
function greeting(ready) {
    setTimeout(function() {
        if (ready == -1) {
            console.log('. . .');
        }
    }, 5000);
    console.log(' \n \n Welcome to Employee Tracker. \n Personnel in your console. \n \n');
    mainPrompt()
}

function mainPrompt() {
    inq.prompt({
        type: 'list',
        message: 'What Would You like to Do? :',
        choices: [
            "View Employees",
            "View Departments",
            "View Roles",
            "Add Employee",
            "Add Department",
            "Add Role",
            "Update Role",
            "Update Manager",
            "Display Employees by Manager",
            "Delete an Employee",
            "Delete a Role",
            "Delete a Department",
            "View Utilized Budget for a Department",
            "Quit"
        ],
        name: 'choice'
    }).then((answer) => {
        switch (answer.choice) {
            case 'View Employees':
                employeeView();
                break;

            case 'View Departments':
                departmentView();
                break;

            case 'View Roles':
                roleView();
                break;

            case 'Add Employee':
                addEmployeePrompt();
                break;
            case 'Add Department':
                addDepartmentPrompt();
                break;

            case 'Add Role':
                addRolePrompt();
                break;

            case 'Update Role':
                updateRolePrompt();
                break;
            case 'Update Manager':
                updateManagerPrompt();
                break;
            case 'Display Employees by Manager':
                viewByManagerPrompt();
                break;
            case "Delete an Employee":
                deleteEmployeePrompt();
                break;
            case "Delete a Role":
                deleteRolePrompt();
                break;
            case "Delete a Department":
                deleteDepartmentPrompt();
                break;
            case "View Utilized Budget for a Department":
                viewBudgetPrompt();
                break;

            case 'Quit':
                Sequelize.end();
                break;
        }
    });
};
/* #endregion */
async function departmentView() {
    console.log('deptview fired');
    await Dept.findAll({ raw: true }).then(res => { console.log(res) })
    mainPrompt()
}

async function roleView() {
    console.log('roleView fired');
    await Role.findAll({ raw: true }).then(res => { console.log(res) });
    mainPrompt()
}

async function employeeView() {
    console.log('employeeView fired');
    let data = [];
    let emps = [];
    await Employee.findAll({ raw: true }).then(res => data.push(res));
    console.log('data:', data);
    data[0].forEach(emp => emps.push(emp));
    emps.forEach(person => Employee.findByPk));

console.table(emps);

// let displayTable = [];
// displayTable.push(JSON.stringify(empAll));
// displayTable.forEach(type => console.log(type));
// console.table(JSON.parse(displayTable));
// const query = 'SELECT * FROM employees';
// connection.query(query, (err, res) => {
//     if (err) throw err;
//     console.log(`\n`);
//     console.log(res);
// })
mainPrompt()
}


function addEmployeePrompt() {
    console.log('addEmp fired');
}

function addDepartmentPrompt() { console.log('addDept fired'); }

function addRolePrompt() { console.log('addRole fired'); }

function updateRolePrompt() { console.log('updateRole fired'); }

function updateManagerPrompt() { console.log('update Manager fired'); }

function deleteEmployeePrompt() { console.log('deleteEMP fired'); }

function deleteRolePrompt() { console.log('DeleteRole fired'); }

function deleteDepartmentPrompt() { console.log('DeleteDEPT fired'); }

function viewBudgetPrompt() { console.log('ViewBudget fired'); }

init();