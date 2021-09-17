// Require all necessary packages
// require database
const fs = require('fs');
const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const questions = require('./lib/questions')

// Create a function that `start()` all processes
  // Clear the terminal
  // use `db.connection` to `getAllTheTablesCombined()` and store in a variable `AllTables`
  // console.Table(AllTables)
  // call `mainQuestion()`

// Create a function to ask the main question `mainQuestion()`
  // use inquire and ask the user `What would you like to do`
  // switch or if statement to compare user response
    // for example: if "Add employee" call "addEmployee()"

// Create `addEmployee()` 
  // ask user for 'firstName, lastName, roleId, manager'
  // send information to the database `createOne()` to create employee
  // call ask `mainQuestion()`


