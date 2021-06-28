/* #region Imports */
const png = require('console-png');
const image = require('fs').readFileSync(__dirname + '/images/ETLogo2.png');
const inq = require('inquirer');
const connection = require('./config/connection');
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
    console.log(`\n \n Welcome to Employee Tracker. \n Personnel in your console. \n \n`);
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
                connection.close();
                break;
        }
    });
};
/* #endregion */
async function departmentView() {
    console.log('deptview fired');
    await Dept.findAll({ raw: true }).then(res => { console.table(res) })
    mainPrompt()
}

async function roleView() {
    console.log('roleView fired');
    let dataRoles = [];
    let dataDept = [];
    await Role.findAll({ raw: true }).then(res => dataRoles.push(res));
    await Department.findAll({ raw: true }).then(res => dataDept.push(res));
    mainPrompt()
}

async function employeeView() {
    console.log('employeeView fired');
    let data = [];
    let emps = [];

    await Employee.findAll({ raw: true }).then(res => data.push(res));
    data[0].forEach(emp => emps.push(emp));
    emps.find(r => {
        //Pretty up the data for the console.table
        if (r.roleId == 1) { r.roleId = "CEO" }
        if (r.roleId == 2) { r.roleId = "CFO" }
        if (r.roleId == 3) { r.roleId = "DBD" }
        if (r.roleId == 4) { r.roleId = "REP" }
        if (r.roleId == 5) { r.roleId = "DHR" }
        if (r.roleId == 6) { r.roleId = "MCA" }
        if (r.roleId == 7) { r.roleId = "ESQ" }
        if (r.roleId == 8) { r.roleId = "CPA" }
        let mID = (r.managerId - 1)
        if (r.managerId) { r.managerId = emps[mID].firstName + " " + emps[mID].lastName }
    })
    console.table(emps);

    mainPrompt()
}


function addEmployeePrompt() {
    console.log('addEmp fired');
    inq.prompt([{
        type: 'input',
        message: 'New Employee First Name:',
        name: 'fName',
    }, {
        type: 'input',
        message: 'Last Name? :',
        name: 'lName',
    }, {
        type: 'list',
        message: 'What Job Will They Do?:',
        choices: [
            'Account Rep',
            'Lawyer',
            'Accountant',
            'Master of Custodial Arts'
        ],
        name: 'job'
    }, {
        type: 'confirm',
        message: "Are you sure you'd like to add this employee?",
        name: 'confirm'
    }]).then((answer) => {
        console.log(answer);
        let roleid
        let departmentid
        let managerid
        let job = answer.job
        let fName = answer.fName
        let lName = answer.lName
        if (job === 'Account Rep') {
            roleid = 4;
            departmentid = 1;
            managerid = 3

        }
        if (answer.confirm) {
            Employee.create({
                firstName: fName,
                lastName: lName,
                roleId: roleid,
                managerId: managerid
            }).then(employeeView())

        } else {
            console.log('Ok, going back to welcome.')

        }
        mainPrompt();
    })
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