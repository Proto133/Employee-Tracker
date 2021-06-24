/* #region Imports */
const png = require('console-png');
const image = require('fs').readFileSync(__dirname + '/images/ETLogo2.png');
const inq = require('inquirer');
const connection = require('connection')
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
            "View employees",
            "View departments",
            "View roles",
            "Add employee",
            "Add department",
            "Add role",
            "Update role",
            "Update manager",
            "Display employees by manager",
            "Delete an employee",
            "Delete a role",
            "Delete a department",
            "View utilized budget for a department",
            "Quit"
        ],
        name: 'choice'
    }).then((answer) => {
        switch (answer.action) {
            case 'View Departments':
                departmentViewPrompt();
                break;

            case 'View Roles':
                roleViewPrompt();
                break;

            case 'Add Employee':
                addEmployeePrompt();
                break;
            case 'Add department':
                addDepartmentPrompt();
                break;

            case 'Add role':
                addRolePrompt();
                break;

            case 'Update role':
                updateRole();
                break;
            case 'Update Manager':
                updateManager();
                break;
            case 'Display employees by manager':
                viewByManager();
                break;
            case "Delete an employee":
                deleteEmployee();
                break;
            case "Delete a role":
                deleteRole();
                break;
            case "Delete a department":
                deleteDepartment();
                break;
            case "View utilized budget for a department":
                viewBudget();
                break;

            case 'Quit':
                connection.end();
                break;
        }
    });
    /* #endregion */


    function departmentViewPrompt() {}

    function roleViewPrompt() {}

    function addEmployeePrompt() {}

    function addDepartmentPrompt() {}

    function addRolePrompt() {}

    function updateRole() {}

    function updateManager() {}

    function deleteEmployeePrompt() {}

    function deleteRolePrompt() {}

    function deleteDepartmentPrompt() {}

    function viewBudgetPrompt() {}

    // Connect to the DB
    connection.connect((err) => {
        if (err) throw err;
        console.log(`connected as id ${connection.threadId}\n`);
        init();
    });