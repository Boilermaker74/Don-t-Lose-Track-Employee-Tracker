const inquirer = require("inquirer");
const mysql = require('mysql2');
const pageSize = 20;
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Bootcamp123!',
    database: 'employees_db',
},
    console.log('Conected to database!'));



db.connect(function (err) {
    try {
      if (err) throw err;
      programInit();
    //   startMenu();
    } catch (error) {
      // Handle the error
      console.error(error);
      // Perform any necessary cleanup or notification
      // Terminate the application gracefully
      process.exit(1); // Exit with a non-zero status code to indicate an error
    }
  });


// Start the application and Display the Banner

const programInit = () => { 
    console.clear()
    console.log('\r\n  _____                 _                         _____               _             \r\n | ____|_ __ ___  _ __ | | ___  _   _  ___  ___  |_   _| __ __ _  ___| | _____ _ __ \r\n |  _| | \'_ ` _ \\| \'_ \\| |\/ _ \\| | | |\/ _ \\\/ _ \\   | || \'__\/ _` |\/ __| |\/ \/ _ \\ \'__|\r\n | |___| | | | | | |_) | | (_) | |_| |  __\/  __\/   | || | | (_| | (__|   <  __\/ |   \r\n |_____|_| |_| |_| .__\/|_|\\___\/ \\__, |\\___|\\___|   |_||_|  \\__,_|\\___|_|\\_\\___|_|   \r\n                 |_|            |___\/                                               \r\n')
    //  "-----------------------------------------------------------------------------------------")
      startMenu();
}

const startMenu = () => {


    inquirer.prompt([
        {
            type: "list",
            pageSize: pageSize,
            name: "menu",
            message: "What would you like to do?",
            choices: ['View All Employees', 'View All Departments', 'View All Roles', 'Add a New Department','Add a New Role','Add an Employee', 'Update a Role for an Employee', 'Quit']
        }
    ]).then((res) => {

        switch (res.menu) {
            case 'View All Employees':
                viewEmployees()
                break;
            case 'View All Departments':
                viewTable('department')
                break;
            case 'View All Roles':
                viewRoles()
                break;
            case 'Add a New Department':
                    addDepartment()
                    break;
            case 'Add a New Role':
                    addRole()
                    break;
            case 'Add an Employee':
                addEmployee()
                break;
            case 'Update a Role for an Employee':
                updateEmployeeRole()
                break;

        // Acknowledge the user has quit the program  
        
            case 'Quit':
                console.clear()
                console.log("You have chosen to exit the program.")
                console.log("Thank you for using Employee Tracker.")
                db.end();
                break;
        }
    })
}
//helper functions

function addToDb(q) {
    db.query( q
        , (err, result) => {  
            if (err) {
                reject(err);
            }
            startMenu()
        });
}
const uniqueBy = (arr, prop) => {
    return [...new Map(arr.map((m) => [m[prop], m])).values()];
  };

  //viewing functions

const viewTable = (table) => {
    db.query(`SELECT * FROM ${table}`, (err, result) => {
        if (err) throw err;
        console.table(result);
        startMenu()
    })
}

const viewRoles = () => {
    db.query(`SELECT title, role.id, dept_name AS department, salary FROM role INNER JOIN department ON role.department_id = department.id; `, (err, result) => {
        if (err) throw err;
        console.table(result);
        startMenu()
    })
}

const viewEmployees = () => {
    db.query(`
    SELECT employee.id AS id, employee.first_name AS firstName, employee.last_name AS lastName, role.title AS title, department.dept_name AS department, role.salary AS salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON manager.id = employee.manager_id
  `
        , (err, result) => {
            if (err) throw err;
            console.table(result);
            startMenu();
        });
}

// Add a new employee function

const addEmployee = () => {

    // Function to get roles from the database

    const getRoles = () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT id, title FROM role', (err, res) => {
                if (err) {
                    reject(err);
                }
                const roles = res.map((row) => ({
                    name: row.title,
                    value: row.id
                }));
                resolve(roles);
            });
        });
    };

    // Next, get the list of employees to use as managers from the database

    const getManagers = () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT employee.manager_id, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name FROM employee LEFT JOIN employee manager ON manager.id = employee.manager_id WHERE employee.manager_id IS NOT NULL`, (err, res) => {
                if (err) {
                    reject(err);
                }
                 const managers= res.map((row) => ({
                    name: row.manager_name,
                    value: row.manager_id
                }));

                const newManagers = uniqueBy(managers, 'value')
                // newManagers.push('nonpame');
                resolve(newManagers);
                });
        });
    };

    // Use Promise.all to retrieve both roles and managers

    Promise.all([getRoles(), getManagers()])
        .then(([roles, managers]) => {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: "\n"+"Type the employee's first name"
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: "\nType the employee's last name"
                },
                {
                    type: 'list',
                    pageSize: pageSize,
                    name: 'role_id', // Use role_id to store the selected role's ID
                    message: "\n"+"What is the employee's role?",
                    choices: roles
                },
                {
                    type: 'list',
                    pageSize: pageSize,
                    name: 'manager_id', // Use manager_id to store the selected manager's ID
                    message: "\nWho is the employee's manager?",
                    choices: managers
                }
            ])
                .then((res) => {
                    let employee = {
                        first_name: res.first_name,
                        last_name: res.last_name,
                        role_id: res.role_id,
                        manager_id: res.manager_id,
                    };
                    
                     
                   const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${employee.first_name}', '${employee.last_name}', '${employee.role_id}', '${employee.manager_id}')`
                   addToDb(query);
                   console.log()
                    console.log(`Added employee ${employee.first_name} ${employee.last_name} to database`)
                    console.log()
                    
                    // startMenu();
                });
        })
        .catch((err) => {
            console.error(err); // Handle any errors
        });
};


// Add a Role to the database

const addRole = () => {
    const getDepts = () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT id, dept_name FROM department', (err, res) => {
                if (err) {
                    reject(err);
                }
                const depts = res.map((row) => ({
                    name: row.dept_name,
                    value: row.id
                }));
                const newDepts = uniqueBy(depts, 'value');
                resolve(newDepts);
            });
        });
    };

    getDepts()
        .then((depts) => {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: "\r\n What is the title of the role? \n"
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: "What is the salary of the role?",
                    validate: (answer) => {
                        if (isNaN(answer)) {
                          return "please enter a number";
                        }
                        return true;
                      },
                  
                },
                {
                    type: 'list',
                    pageSize: pageSize,
                    name: 'department_id',
                    message: "What department does the role belong to?",
                    choices: depts
                },
            ])
            .then((res) => {
                const role = {
                    title: res.title,
                    salary: res.salary,
                    department_id: res.department_id
                };

                // Use placeholders in the SQL query and pass values as parameters
                const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
                const values = [role.title, role.salary, role.department_id];

                db.query(query, values, (err, result) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log();
                        console.log(`The role of "${role.title}" added successfully.`);
                        console.log();
                        startMenu()
                    }
                });
            })
            .catch((err) => {
                console.error(err); // Handle inquirer errors
            });
        })
        .catch((err) => {
            console.error(err); // Handle database query errors
        });
};

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'dept_name',
            message: "Enter the name of the department:"
        }
    ])
    .then((res) => {
        const department = {
            dept_name: res.dept_name
        };

        // Use placeholders in the SQL query and pass values as parameters
        const query = 'INSERT INTO department (dept_name) VALUES (?)';
        const values = [department.dept_name];

        db.query(query, values, (err, result) => {
            if (err) {
                console.error(err);
            } else {
                console.log();
                console.log(`Department "${department.dept_name}" added successfully.`);
                console.log();
                startMenu()
            }
        });
    })
    .catch((err) => {
        console.error(err); // Handle inquirer errors
    });
};


const updateEmployeeRole = () => {
    // Function to get a list of employees from the database
    const getEmployees = () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT id, CONCAT(first_name, " ", last_name) AS employee_name FROM employee', (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    const employees = res.map((row) => ({
                        name: row.employee_name,
                        value: row.id
                    }));
                    resolve(employees);
                }
            });
        });
    };

    // Function to get a list of roles from the database

    const getRoles = () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT id, title FROM role', (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    const roles = res.map((row) => ({
                        name: row.title,
                        value: row.id
                    }));
                    resolve(roles);
                }
            });
        });
    };

    Promise.all([getEmployees(), getRoles()])
        .then(([employees, roles]) => {
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee_id',
                    pageSize: pageSize,
                    message: 'Select the employee to update:',
                    choices: employees
                },
                {
                    type: 'list',
                    name: 'new_role_id',
                    pageSize: pageSize,
                    message: 'Select the new role for the employee:',
                    choices: roles
                }
            ])
            .then((answers) => {
                const { employee_id, new_role_id } = answers;

                // Use placeholders in the SQL query and pass values as parameters
                const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
                const values = [new_role_id, employee_id];

                db.query(query, values, (err, result) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log();
                        console.log('Employee role updated successfully.');
                        console.log();
                        startMenu()
                    }
                });
            })
            .catch((err) => {
                console.error(err); // Handle inquirer errors
            });
        })
        .catch((err) => {
            console.error(err); // Handle database query errors
        });
};