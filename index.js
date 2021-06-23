/* #region Imports */
const png = require('console-png');
const image = require('fs').readFileSync(__dirname + '/images/ETLogo2.png');
const inq = require('inquirer')
    /* #endregion */



// View employees, view departments, view roles, add employee, add department, add role, update role, update manager, 
// view employees by manager, delete employee, delete role, delete department, quit
png(image, function(err, string) {
    if (err) throw err;
    console.log(string);
    greeting();
})

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

    /* #region Console Image */

    inq.prompt({
        type: 'list',
        message: 'What Would You like to Do? :',
        choices: ["View employees",
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
    })
}


/* #endregion */