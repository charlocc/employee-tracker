// const db = require('')
const inquirer = require('inquirer')


const departmentArray = [];
const roleArray = [];
const employeeArray = [];

function mainQuestion() {
    inquirer
        .prompt([{
            type: 'list',
            message: 'What would you like to do?',
            name: 'choice',
            choices: ['Add department', 'Add role', 'Add employee', 'View departments', 'View roles', 'View Employees', 'Update an Employee', 'Done']
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

                    break;
                case 'View roles':

                    break;
                case 'View employees':

                    break;
                case 'Update an Employee':

                    break;
                default:
                    return "Thank you";
            }
        })
}

function addDepartment() {
    inquirer
        .prompt([{
            type: 'input',
            message: 'What is the name of the department?',
            name: 'departmentName'
        }])
        .then(function (response) {
            departmentArray.push(`${response.departmentName}`)
        })
        mainQuestion();

}

function addRole() {
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
            type: 'input',
            message: 'Which department does the role belong to?',
            name: 'roleDepartment'
        }])
        .then(function (response) {
            roleArray.push(`${response.roleName}`)
        })
        mainQuestion();
}

const getRole = async () => {
    let roles = await departmentQuestions.getAllTables('role');
    return roles.map(({ id_role, title }) => {
        return {
            name: title,
            value: id_role
        }
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
        name: 'employeeRole',
        choices: getRole()
    },
    {
        // Make list type with the employees already entered
        type: 'input',
        message: `Who is the employee's manager?`,
        name: 'employeeManager',
    }])
    .then(function (response) {
        employeeArray.push(`${response.firstName} ${response.lastName}`)
    })
    mainQuestion();
}
module.exports = { mainQuestion, addDepartment, addRole, getRole, addEmployee };