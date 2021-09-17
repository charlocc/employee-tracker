const fs = require('fs');
const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');


// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'work_db'
    },
    console.log(`Connected to the work_db database.`)
  );

const startQuestion =[
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'add',
        choices: ['Add department', 'Add role', 'Add employee', 'Done']
    },
]

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
    {
        // Make list type with the employees already entered
        type: 'input',
        message: `Who is the employee's manager?`,
        name: 'employeeManager',
    },
]
