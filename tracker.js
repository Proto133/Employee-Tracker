/* #region Imports */
const png = require('console-png');
const image = require('fs').readFileSync(__dirname + '/images/ETLogo2.png');
const inq = require('inquirer');
const connection = require('./config/connection');
const EXIT = () => connection.end();
// const Employee = require('./models/Employee');
// const Dept = require('./models/Department');
// const Role = require('./models/Role');
const orm = require('./orm');
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
        if (answer.choice != 'Quit') {
            switch (answer.choice) {
                case 'View Employees':
                    orm.viewEmployees()
                        .then(() => start())
                    break;

                case 'View Departments':
                    orm.viewDepartments()
                        .then(() => start())
                    break;

                case 'View Roles':
                    orm.viewRoles()
                        .then(() => start())
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
            }
        } else {
            orm.endConnection();
        }
    });
};
/* #endregion */
function addEmployeePrompt() {
    console.log('addEmp fired');
    orm.getEmployees()
        .then((res) => {
            const mgrArr = [];
            for (let i = 0; i < res.length; i++) {
                mgrArr.push(res[i].name);
            }
            mgrArr.push("none");
            orm.getRoles()
                .then((response) => {
                    const rTitleArr = [];
                    for (let i = 0; i < response.length; i++) {
                        rTitleArr.push(response[i].title);
                    }
                    inq.prompt([{
                            type: "input",
                            message: "Enter Employee's First Name:",
                            name: "firstName"
                        },
                        {
                            type: "input",
                            message: "Enter Employee's Last Name",
                            name: "lastName"
                        },
                        {
                            type: "list",
                            message: "Select employee's role",
                            choices: rTitleArr,
                            name: "role"
                        },
                        {
                            type: "list",
                            message: "Who is the Employee's Manager",
                            choices: mgrArr,
                            name: "manager"
                        }
                    ]).then(({ firstName, lastName, role, manager }) => {
                        const roleId = response[rTitleArr.indexOf(role)].id;
                        if (manager === "none") {
                            orm.addEmployee(firstName, lastName, roleId)
                                .then(function() {
                                    console.log("\n");
                                    start();
                                });
                        } else {
                            const managerId = res[mgrArr.indexOf(manager)].id;
                            orm.addEmployee(firstName, lastName, roleId, managerId)
                                .then(function() {
                                    console.log("\n");
                                    start();
                                });
                        }
                    });
                });
        });
}


function addDepartmentPrompt() {
    console.log('addDept fired');
    orm.getDepartments()
        .then(function(response) {
            const deptArray = [];
            for (let i = 0; i < response.length; i++) {
                deptArray.push(response[i].name);
            }
            inq.prompt({
                type: "input",
                message: 'What is the name of the department you want to add?:',
                name: "deptName"
            }).then(({ deptName }) => {
                if (deptArray.includes(deptName)) {
                    console.log("That Department Already Exists.\n Try Again.");
                    start();
                } else {
                    orm.addDepartment(deptName)
                        .then(function() {
                            console.log("\n");
                            start();
                        });
                }
            });
        });
}

function addRolePrompt() {
    orm.getRoles()
        .then(function(roles) {
            const roleArray = [];
            for (let i = 0; i < roles.length; i++) {
                roleArray.push(roles[i].title);
            }
            orm.getDepartments()
                .then(function(deptArray) {
                    const deptNames = [];
                    for (let i = 0; i < deptArray.length; i++) {
                        deptNames.push(deptArray[i].dept_name);
                    }
                    inq.prompt([{
                            type: "input",
                            message: "Enter the name of the role you would like to add",
                            name: "title"
                        },
                        {
                            type: "input",
                            message: "Enter the annual salary of the new role",
                            name: "salary"
                        },
                        {
                            type: "list",
                            message: "Select the department in which the new role will work",
                            choices: deptNames,
                            name: "department"
                        }
                    ]).then(function({ title, salary, department }) {
                        const deptId = deptArray[deptNames.indexOf(department)].id;
                        if (roleArray.includes(title)) {
                            console.log("Error - that title already exists!\n");
                            start();
                        } else {
                            orm.addRole(title, salary, deptId)
                                .then(function() {
                                    console.log("\n");
                                    start();
                                });
                        }
                    });
                });
        });
}

// Grabs all employees, asks user which one they want to update, asks what role the employee should have, then calls ORM function to update the database
function updateRolePrompt() {
    orm.getEmployees()
        .then(function(res) {
            const empArray = [];
            for (let i = 0; i < res.length; i++) {
                empArray.push(res[i].name);
            }
            orm.getRoles()
                .then(function(response) {
                    const roleArray = [];
                    for (let i = 0; i < response.length; i++) {
                        roleArray.push(response[i].title);
                    }
                    inq.prompt([{
                            type: "list",
                            message: "Choose the employee whose role you'd like to update",
                            choices: empArray,
                            name: "employee"
                        },
                        {
                            type: "list",
                            message: "Select the employee's new role",
                            choices: roleArray,
                            name: "role"
                        }
                    ]).then(function({ employee, role }) {
                        const empId = res[empArray.indexOf(employee)].id;
                        orm.updateRole(empId, role)
                            .then(function() {
                                console.log("\n");
                                start();
                            })
                    })
                })
        })
}

// Grabs all employees, asks user which one they want to update, asks what manager the employee should have, then calls ORM function to update the database
function updateManagerPrompt() {
    orm.getEmployees()
        .then(function(employees) {
            const empArray = [];
            for (let i = 0; i < employees.length; i++) {
                empArray.push(employees[i].name);
            }
            inq.prompt([{
                    type: "list",
                    message: "Select the employee whose manager you would like to update",
                    choices: empArray,
                    name: "employee"
                },
                {
                    type: "list",
                    message: "Select the employee's new manager",
                    choices: empArray,
                    name: "manager"
                }
            ]).then(function({ employee, manager }) {
                if (employee === manager) {
                    console.log("Error - you cannot assign an employee to manage him/herself!");
                    start();
                } else {
                    const empId = employees[empArray.indexOf(employee)].id;
                    const mgrId = employees[empArray.indexOf(manager)].id;
                    orm.updateManager(empId, mgrId)
                        .then(function() {
                            console.log("\n");
                            start();
                        });
                }
            });
        });
}

// Grabs all employees, asks the user for which one they want to see direct reports, then calls ORM function to query database and display results
function viewByManagerPrompt() {
    orm.getEmployees()
        .then(function(employees) {
            const empArray = [];
            for (let i = 0; i < employees.length; i++) {
                empArray.push(employees[i].name);
            }
            inq.prompt({
                type: "list",
                message: "Select the manager whose employees you would like to view",
                choices: empArray,
                name: "manager"
            }).then(function({ manager }) {
                const mgrId = employees[empArray.indexOf(manager)].id;
                orm.viewEmpsByMgr(mgrId)
                    .then(function() {
                        console.log("\n");
                        start();
                    });
            });
        });
}

// Grabs all employees, asks user which one they want to delete, then calls ORM function to delete it from the database
function deleteEmployeePrompt() {
    orm.getEmployees()
        .then(function(employees) {
            const empArray = [];
            for (let i = 0; i < employees.length; i++) {
                empArray.push(employees[i].name);
            }
            inq.prompt({
                type: "list",
                message: "Which employee would you like to delete?",
                choices: empArray,
                name: "employee"
            }).then(function({ employee }) {
                const empId = employees[empArray.indexOf(employee)].id;
                orm.deleteRecord("Employees", empId)
                    .then(function() {
                        console.log("\n");
                        start();
                    });
            });
        });
}

// Grabs all roles, asks user which one they want to delete, then calls ORM function to delete it from the database
function deleteRolePrompt() {
    orm.getRoles()
        .then(function(roles) {
            const roleArray = [];
            for (let i = 0; i < roles.length; i++) {
                roleArray.push(roles[i].title);
            }
            inq.prompt({
                type: "list",
                message: "Which role would you like to delete?",
                choices: roleArray,
                name: "role"
            }).then(function({ role }) {
                const roleId = roles[roleArray.indexOf(role)].id;
                orm.deleteRecord("Roles", roleId)
                    .then(function() {
                        console.log("\n");
                        start();
                    });
            });
        });
}

// Grabs all departments, asks user which one they want to delete, then calls ORM function to delete it from the database
function deleteDepartmentPrompt() {
    orm.getDepartments()
        .then(function(depts) {
            const deptArray = [];
            for (let i = 0; i < depts.length; i++) {
                deptArray.push(depts[i].dept_name);
            }
            inq.prompt({
                type: "list",
                message: "Which Department is Being Dissolved?:",
                choices: deptArray,
                name: "dept"
            }).then(function({ dept }) {
                const deptId = depts[deptArray.indexOf(dept)].id;
                orm.deleteRecord("Departments", deptId)
                    .then(function() {
                        console.log("\n");
                        start();
                    });
            });
        });
}

// Grabs all departments, asks user for which one they want to see sum of salaries, then calls ORM function to query database and display results
function viewBudgetPrompt() {
    orm.getDepartments()
        .then(function(depts) {
            const deptArray = [];
            for (let i = 0; i < depts.length; i++) {
                deptArray.push(depts[i].dept_name);
            }
            inq.prompt({
                type: "list",
                message: "Which Department Are We Looking at Today?",
                choices: deptArray,
                name: "dept"
            }).then(function({ dept }) {
                const deptId = depts[deptArray.indexOf(dept)].id;
                orm.viewBudget(deptId)
                    .then(function() {
                        console.log("\n");
                        start();
                    });
            });
        });
}

function start() {
    console.log('\n \n \n')
    mainPrompt();
}

const backToStart = () => {
    console.log('\n \n \n')
    mainPrompt();
}

init();

exports.backtoStart = backToStart;