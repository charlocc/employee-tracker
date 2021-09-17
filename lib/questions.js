const db = require('')
const inquirer = require('inquirer')

const mainQuestion =[
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'add',
        choices: ['Add department', 'Add role', 'Add employee', 'Done']
    },
]
// view / update
const departmentQuestions = [
    {
        type: 'input',
        message: 'What is the name of the department?',
        name: 'departmentName'
    },
]

const roleQuestions = [
    {
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
    },
]


const getRole = async() => {
    let roles = await departmentQuestions.getAllTables('role');
    return roles.map(({id_role, title})=> {
        return{
            name:title,
            value:id_role
        }
    })
}

const employeeQuestions = [
    {
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
        type: 'input',
        message: `What is the employee's role?`,
        name: 'employeeRole',
    },
    // choices: ()=> getRole();
    {
        // Make list type with the employees already entered
        type: 'input',
        message: `Who is the employee's manager?`,
        name: 'employeeManager',
    },
]

module.export = questions