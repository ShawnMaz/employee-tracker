const inquirer = require('inquirer');
const db = require('./db/connection');
require('dotenv').config();
const { getAllData, postData, updateEmployeeRole } = require('./lib/Data');
const cTable = require('console.table');

const program = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'task',
            message: 'Please select an operation from the list below: ',
            choices: ['View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role'
            ]
        }
    ]).then(answer => {
        // console.clear();
        const data = getAllData('departments');
        console.table(data);
    }).then(() => {
        db.end();
    })
};

program();