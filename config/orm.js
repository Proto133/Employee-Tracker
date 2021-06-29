const connection = require('./connection');
const tracker = require('../tracker')
const cTable = require('console.table')


const orm = {
    addDepartment: function(deptName) {
        return new Promise(function(resolve, reject) {
            const queryString = `INSERT INTO Departments (dept_name) VALUES (?)`;
            connection.query(queryString, deptName, function(err, result) {
                if (err) {
                    return reject(err);
                }
                console.log("Department Successfully Added!");
                return resolve();
            });
        });

    },
    addRole: function(roleTitle, roleSalary, deptId) {
        return new Promise(function(resolve, reject) {
            const queryString = "INSERT INTO Roles (title, salary, dept_id) VALUES (?, ?, ?)";
            connection.query(queryString, [roleTitle, roleSalary, deptId], function(err, result) {
                if (err) {
                    return reject(err);
                }
                console.log("Role Successfully Added!");
                return resolve();
            });
        });

    },
    addEmployee: function(firstName, lastName, roleId, mgrId) {
        return new Promise(function(resolve, reject) {
            const queryString = "INSERT INTO Employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
            connection.query(queryString, [firstName, lastName, roleId, mgrId], function(err, result) {
                if (err) {
                    return reject(err);
                }
                console.log("Employee Successfully Added!");
                return resolve();
            });
        });

    },
    viewEmployees: function() {
        return new Promise(function(resolve, reject) {
            const queryString = 'SELECT Employees.id, first_name, last_name, title, salary, dept_name, manager_id FROM Employees LEFT JOIN Roles ON Employees.role_id = Roles.id LEFT JOIN Departments ON Roles.dept_id = Departments.id';
            connection.query(queryString, function(err, result) {
                if (err) {
                    return reject(err);
                }
                let newTable = [];
                for (let i = 0; i < result.length; i++) {


                    let manager_name = "";
                    if (result[i].manager_id !== null) {
                        for (let j = 0; j < result.length; j++) {
                            if (result[j].id === result[i].manager_id) {
                                manager_name = result[j].first_name + " " + result[j].last_name;
                            }
                        }
                    } else {
                        manager_name = "Not available";
                    }
                    const tableElement = {
                        "Employee ID": result[i].id,
                        "First Name": result[i].first_name,
                        "Last Name": result[i].last_name,
                        "Title": result[i].title,
                        "Salary": result[i].salary,
                        "Department": result[i].dept_name,
                        "Manager": manager_name
                    };
                    newTable.push(tableElement);
                }
                console.table(newTable);
                return resolve();
            });
        });

    },
    getEmployees: function() {
        return new Promise(function(resolve, reject) {
            const queryString = "SELECT * FROM Employees";
            connection.query(queryString, function(err, result) {
                if (err) {
                    return reject(err);
                }
                const empArray = [];
                for (let i = 0; i < result.length; i++) {
                    const empObj = {
                        id: result[i].id,
                        name: result[i].first_name + " " + result[i].last_name
                    };
                    empArray.push(empObj);
                }
                return resolve(empArray);
            });
        });
    },
    //Query DB for all pertinent info, then create an object that's pretty enough for the spotlight from the results.
    viewRoles: function() {
        return new Promise(function(resolve, reject) {
            const queryString = "SELECT Roles.id, title, salary, dept_name FROM Roles LEFT JOIN Departments ON Roles.dept_id = Departments.id";
            connection.query(queryString, function(err, result) {
                if (err) {
                    return reject(err);
                }
                const newTable = [];
                for (let i = 0; i < result.length; i++) {
                    const roleObj = {
                        "ID": result[i].id,
                        "Title": result[i].title,
                        "Salary": result[i].salary,
                        "Department": result[i].dept_name
                    };
                    newTable.push(roleObj);
                }
                console.table(newTable);
                return resolve();
            });
        });

    },
    //Get Roles from DB then send them back.
    getRoles: function() {
        return new Promise(function(resolve, reject) {
            const queryString = "SELECT * FROM Roles";
            connection.query(queryString, function(err, result) {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    },
    viewDepartments: function() {
        return new Promise(function(resolve, reject) {
            const queryString = "SELECT * FROM Departments";
            connection.query(queryString, function(err, result) {
                if (err) {
                    return reject(err);
                }
                console.table(result);
                return resolve();
            });
        });

    },
    getDepartments: function() {
        return new Promise(function(resolve, reject) {
            const queryString = "SELECT * FROM Departments";
            connection.query(queryString, function(err, result) {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    },
    updateRole: function(empId, newRole) {
        return new Promise(function(resolve, reject) {
            const queryString = "SELECT id FROM Roles WHERE title = ?";
            connection.query(queryString, newRole, function(err, result) {
                if (err) {
                    return reject(err);
                }
                const newRoleId = result[0].id;
                const queryString = "UPDATE Employees SET ? WHERE ?";
                connection.query(queryString, [{
                            role_id: newRoleId
                        },
                        {
                            id: empId
                        }
                    ],
                    function(err, result) {
                        if (err) {
                            return reject(err);
                        }
                        console.log("Employee's Role Successfully Updated!");
                        return resolve();
                    });
            });
        });

    },
    updateManager: function(empId, newMgrId) {
        return new Promise(function(resolve, reject) {
            const queryString = "UPDATE Employees SET ? WHERE ?";
            connection.query(queryString, [{
                        manager_id: newMgrId
                    },
                    {
                        id: empId
                    }
                ],
                function(err, result) {
                    if (err) {
                        return reject(err);
                    }
                    console.log("Employee's Manager Successfully Updated!");
                    return resolve();
                });
        });

    },
    viewEmpsByMgr: function(mgrId) {
        return new Promise(function(resolve, reject) {
            const queryString = 'SELECT Employees.id, first_name, last_name, title, salary,dept_name, manager_id FROM Employees LEFT JOIN Roles ON Employees.role_id = Roles.id LEFT JOIN Departments ON Roles.dept_id = Departments.id WHERE manager_id = ?';
            connection.query(queryString, mgrId, function(err, result) {
                if (err) {
                    return reject(err);
                }
                let newTable = [];
                for (let i = 0; i < result.length; i++) {
                    const tableElement = {
                        "Employee ID": result[i].id,
                        "First Name": result[i].first_name,
                        "Last Name": result[i].last_name,
                        "Title": result[i].title,
                        "Salary": result[i].salary,
                        "Department": result[i].dept_name
                    };
                    newTable.push(tableElement);
                }
                console.table(newTable);
                return resolve();
            });
        });

    },
    deleteRecord: function(tableInput, recordId) {
        return new Promise(function(resolve, reject) {
            const queryString = "DELETE FROM ?? WHERE id = ?";
            connection.query(queryString, [tableInput, recordId], function(err, result) {
                if (err) {
                    return reject(err);
                }
                console.log("Record Successfully Deleted");
                return resolve();
            });
        });

    },
    viewBudget: function(deptId) {
        return new Promise(function(resolve, reject) {
            const queryString = "SELECT * FROM Roles WHERE dept_id = ?";
            connection.query(queryString, deptId, function(err, roleResult) {
                if (err) {
                    return reject(err);
                }
                let utilizedBudget = 0;
                for (let i = 0; i < roleResult.length; i++) {
                    const roleId = roleResult[i].id;
                    const salary = roleResult[i].salary;
                    const queryString = "SELECT * FROM Employees WHERE role_id = ?";
                    connection.query(queryString, roleId, function(err, empResult) {
                        if (err) {
                            return reject(err);
                        }
                        utilizedBudget += empResult.length * salary;
                        if (i === roleResult.length - 1) {
                            console.log("Total Budget Used:", utilizedBudget);
                            return resolve();
                        }
                    });
                }
            })
        })
    },
    endConnection: () => {
        connection.end((err) => {
            if (err) {
                return console.log(err.message);
            } else {
                console.log('\n\u{1F44B} GOOD-BBBBBBYYYYYYYYYYYYYYYEEEEEEEEEEEEEEEEEEEEEE!!!!!!!!!!!!!!!!!!!!!!!! \u{1F44B}\n');
            }
        });
    }

};

module.exports = orm;