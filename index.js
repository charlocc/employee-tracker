// Require all necessary packages
const fs = require('fs');
const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const { mainQuestion } = require('./lib/questions')
// require database
const db = require('./db/connection');

// Create a function that `start()` all processes
const start = () => {
  // Clear the terminal
  console.clear()
  // Run main question function
  mainQuestion();
}
start();




// Create `addEmployee()` 
  // ask user for 'firstName, lastName, roleId, manager'
  // send information to the database `createOne()` to create employee
  // call ask `mainQuestion()`


