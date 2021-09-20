// Require all necessary packages
const fs = require('fs');
const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const { mainQuestion, addDepartment, addRole, getRole, addEmployee } = require('./lib/questions')
// require database
const db = require('./db/connection');

// Create a function that `start()` all processes
const start = () => {
  // Clear the terminal
  console.clear()
  // use `db.connection` to `getAllTheTablesCombined()` and store in a variable `AllTables`
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
start();

// SELECT employee.first_name AS First Name, employee.last_name AS Last Name
//     FROM role
//     LEFT JOIN employee ON employee.role_id = role.id;


// Create a function to ask the main question `mainQuestion()`
  // use inquire and ask the user `What would you like to do`
  // switch or if statement to compare user response
    // for example: if "Add employee" call "addEmployee()"

// Create `addEmployee()` 
  // ask user for 'firstName, lastName, roleId, manager'
  // send information to the database `createOne()` to create employee
  // call ask `mainQuestion()`


