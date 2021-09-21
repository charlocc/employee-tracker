const inquirer = require('inquirer')
const db = require('../db/connection');

let departmentArray = ['Executive Staff', 'Human resources', 'Business Development', 'Marketing', 'Sales'];
let roleArray = ['Chief Executive Officer', 'Head of HR', 'Top Idea Thinker-Upper', 'Marketing Manager', 'Marketing Coordinator', 'Sales Team Manager', 'Sales Associate'];
let employeeArray = ['Stan Smith', 'Sally Jenkins', 'John Rodgers', 'Louisa Daniels', 'Angela Doe', 'Jane Stephens', 'Joey Bower'];
let managerArray = ['Stan Smith', 'Louisa Daniels', 'Jane Stephens'];


function post(data) {
    db.query(data, (err, results) => {
        if (err) {
            console.log(err);
        }
        console.table('Success');
    });
}

const mainQuestion = () => {
    inquirer
        .prompt([{
            type: 'list',
            message: 'What would you like to do?',
            name: 'choice',
            choices: ['Add department', 'Add role', 'Add employee', 'View departments', 'View roles', 'View employees', 'Update an employee', 'Done']
        }])
        .then(response => {
            switch (response.choice) {
                case 'Add department':
                    addDepartment();
                    break;
                case 'Add role':
                    addRole();
                    break;
                case 'Add employee':
                    addEmployee();
                    break;
                case 'View departments':
                    displayDepartmentsRoles();
                    break;
                case 'View roles':
                    displayDepartmentsRoles();
                    break;
                case 'View employees':
                    displayEmployees();
                    break;
                case 'Update an Employee':

                    break;
                case 'Done':
                    process.exit();
                    break;
            }
        })
}

// Function to add a department
const addDepartment = () => {
    inquirer
        .prompt([{
            type: 'input',
            message: 'What is the name of the department?',
            name: 'departmentName'
        }])
        .then(function (response) {
            data = `INSERT INTO department (department_name) VALUES ("${response.departmentName}")`;
            // add the department name to the list of department options for user inputs
            departmentArray.push(`${response.departmentName}`);
            // add data to the tables
            post(data);
            mainQuestion();
        })

}

const addRole = () => {
    inquirer
        .prompt([{
            type: 'input',
            message: 'What is the name of the role?',
            name: 'roleName'
        },
        {
            type: 'input',
            message: 'What is the salary of the role?',
            name: 'roleSalary'
        },
        {
            // Displays options of departments already entered
            type: 'list',
            message: 'Which department does the role belong to?',
            name: 'roleDepartment',
            choices: departmentArray
        }])
        .then(function (response) {
            // Creates a department Id for the new role
            for (let i = 0; i < departmentArray.length; i++) {
                roleDepartment = (i + 1);
            }
            data = `INSERT INTO role (title, salary, department_id) VALUES ("${response.roleName}", ${response.roleSalary}, ${roleDepartment})`;
            // add the role name to the list of role options for user inputs
            roleArray.push(`${response.roleName}`);
            // add data to the tables
            post(data);
            mainQuestion();
        })
}


const addEmployee = () => {
    inquirer
        .prompt([{
            type: 'input',
            message: `What is the employee's first name?`,
            name: 'firstName',
        },
        {
            type: 'input',
            message: `What is the employee's last name?`,
            name: 'lastName',
        },
        {
            // Displays options of roles already entered
            type: 'list',
            message: `What is the employee's role?`,
            name: 'role_id',
            choices: roleArray
        },
        {
            // Displays options of employees already entered
            type: 'list',
            message: `Who is the employee's manager's ID number?`,
            name: 'employeeManager',
            choices: employeeArray
        }])
        .then(function (response) {
            // Creates the role Id for the new emplpoyee
            for (let i = 0; i < roleArray.length; i++) {
                roleId = (i + 1);
            }
            // Creates the manager Id for the new employee
            for (let i = 0; i < managerArray.length; i++) {
                employeeManager = (i + 1);
            }
            data = `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
        VALUES ("${response.firstName})", "${response.lastName}", ${roleId}, ${employeeManager})`
            // add the employee names to the list of employee options for user manager inputs
            employeeArray.push(`${response.firstName} ${response.lastName}`);
            // add data to the tables
            post(data);
            // Ask main question again
            mainQuestion();
        })
}


function displayDepartmentsRoles() {
    // Build the table
    db.query(`SELECT department.department_name AS Department, role.title AS Title, role.salary AS Salary
    FROM department
    LEFT JOIN role ON role.department_id = department.id;`, (err, results) => {
        if (err) {
            console.log(err);
        }
        //Clear the console to display the table cleanly
        console.clear();
        console.log("Departments")
        //Display the table
        console.table(results);
        mainQuestion();
    });

}

function displayEmployees() {
    // Build the table 
    db.query(`SELECT employee.first_name AS FirstName, employee.last_name AS LastName, role.title AS Title, employee.manager_id AS Manager
    FROM role
    LEFT JOIN employee ON employee.role_id = role.id;`, (err, results) => {
        if (err) {
            console.log(err);
        }
        //Clear the console to display the table cleanly
        console.clear();
        //Display the table
        console.table(results);
    });
    mainQuestion();
}

const updateEmployee = () => {

}


module.exports = { mainQuestion };