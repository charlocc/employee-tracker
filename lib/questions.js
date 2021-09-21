const inquirer = require('inquirer')
const db = require('../db/connection');

let sql;
let departmentArray = ['Executive Staff', 'Human resources', 'Business Development','Marketing', 'Sales'];
let roleArray = ['Chief Executive Officer', 'Head of HR','Top Idea Thinker-Upper', 'Marketing Manager', 'Marketing Coordinator', 'Sales Team Manager', 'Sales Associate' ];
let employeeArray = ['Stan Smith','Sally Jenkins', 'John Rodgers','Louisa Daniels','Angela Doe','Jane Stephens','Joey Bower' ];
let managerArray= ['Stan Smith', 'Louisa Daniels', 'Jane Stephens' ];

function mainQuestion() {
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
                // Close the server if user chooses "done"
                case 'Done':
                    process.exit();
                    break;
            }
        })
}

function addDepartment() {
    console.clear();
    inquirer
        .prompt([{
            type: 'input',
            message: 'What is the name of the department?',
            name: 'departmentName'
        }])
        .then(function (response) {
            sql = `INSERT INTO department (department_name) VALUES ("${response.departmentName}")`;
            departmentArray.push(`${response.departmentName}`);
            post(sql);
            mainQuestion();
        })

}

function addRole() {
    console.clear();
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
            // Make list type with the departments already entered
            type: 'list',
            message: 'Which department does the role belong to?',
            name: 'roleDepartment',
            choices: departmentArray
        }])
        .then(function (response) {
            for (let i = 0; i < departmentArray.length; i++) {
                roleDepartment = (i+1);
            }
            sql = `INSERT INTO role (title, salary, department_id) VALUES ("${response.roleName}", ${response.roleSalary}, ${roleDepartment})`;
            roleArray.push(`${response.roleName}`);
            post(sql);
            mainQuestion();
        })
}


function addEmployee() {
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
        // Make list type with the roles already entered
        type: 'list',
        message: `What is the employee's role?`,
        name: 'role_id',
        choices: roleArray
    },
    {
        // Make list type with the employees already entered
        type: 'list',
        message: `Who is the employee's manager?`,
        name: 'employeeManager',
        choices: managerArray
    }])
    .then(function (response) {
        for (let i = 0; i < roleArray.length; i++) {
            roleId = (i+1);
        }
        for(let i = 0; i < managerArray.length; i++) {
            employeeManager= (i+1);
        }
        sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
        VALUES ("${response.firstName})", "${response.lastName}", ${roleId}, ${employeeManager})`
        employeeArray.push(`${response.firstName} ${response.lastName}`)
        post(sql);
        
        mainQuestion();
    })
}


function post(sql) {
    db.query (sql, (err,results) => {
        if(err) {
            console.log(err);
        }
        console.table('Success');
    });
}

// If user clicks on "View Departments" or "View Roles"
function displayDepartmentsRoles() {
    db.query(`SELECT department.department_name AS Department, role.title AS Title, role.salary AS Salary
    FROM department
    LEFT JOIN role ON role.department_id = department.id;`, (err, results) => {
      if (err) {
        console.log(err);
      }
      console.table(results);
    });
    mainQuestion();
}

// If user clicks on "View Employees"
function displayEmployees() {
    db.query(`SELECT employee.first_name AS FirstName, employee.last_name AS LastName, role.title AS Title
    FROM role
    LEFT JOIN employee ON employee.role_id = role.id;`, (err, results) => {
      if (err) {
        console.log(err);
      }
      console.table(results);
    });
    mainQuestion();
}


module.exports = { mainQuestion };