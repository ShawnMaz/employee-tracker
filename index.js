const inquirer = require('inquirer');
const db = require('./db/connection');
require('dotenv').config();
const cTable = require('console.table');
const chalk = require('chalk');


async function getAllData(sql) {
    let data = await db.promise().query(sql);
    console.table(data[0]);
    program();
}

async function postData(sql, params) {
    let data = await db.promise().query(sql, params);
    console.log(`${data[0].affectedRows} new record added.`);
    program();
}

function addNewDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'Please enter new department name:',
            validate: function (input) {
                if (input) {
                    return true;
                } else {
                    console.log(chalk.red('\n\tInvalid input!'));
                    return false;
                }
            }
        }
    ]).then(departmentAnswer => {
        sql = `INSERT INTO departments (name)
                    VALUES (?)`;
        postData(sql, departmentAnswer.departmentName.toLowerCase());
    })
}

async function getTableData (sql) {
    let data = await db.promise().query(sql);
    return data[0];
}

function addNewRole() {
    let sql = `SELECT * FROM departments`;
    const departmentList = getTableData(sql);
    let depList;
    departmentList.then((list)=> {
        depList = list
        inquirer.prompt([
            {
                type:'input',
                name:'roleTitle',
                message:'Enter a title for the new role:',
                validate:function(input){
                    if(input){
                        return true;
                    } else {
                        console.log(chalk.red('\n\tPlease enter a valid title.'));
                        return false;
                    }
                }
            },
            {
                type:'input',
                name:'roleSalary',
                message:'Enter a salary for the new role:',
                validate:function(input){
                    if(input && parseInt(input)){
                        return true;
                    } else {
                        console.log(chalk.red('\n\tPlease enter a valid salary.'));
                        return false;
                    }
                }
            }, 
            {
                type:'list',
                name:'departmentName',
                message:'Select a department name from the list below:',
                choices:list,
                loop:false
            }
        ]).then(answer=>{
            const departmentId = depList.filter(department => department.name === answer.departmentName)[0].id;
            sql = `INSERT INTO roles (title, salary, departments_id)
                    VALUES (?,?,?);`;
            postData(sql,[answer.roleTitle, answer.roleSalary, departmentId]);
        });
    });    
}

function addNewEmployee(){
    let sql = `SELECT * FROM roles;`;
    const rolesList = getTableData(sql);
    let rList;

    rolesList.then((roleList) =>{
        rList = roleList.map(role => {
            return {
                id:role.id,
                title:role.title
            }
        });
        // console.log(roleList);
        let sql = `SELECT * FROM employees;`;
        const employeeList = getTableData(sql);
        let empList;

        employeeList.then((emploList) => {
            empList = emploList.filter(emp => {
                return {
                    id:emp.id,
                    first_name:emp.first_name,
                    last_name:emp.last_name
                }
            })

            inquirer.prompt([
                {
                    type:'input',
                    name:'empFirstName',
                    message:"Enter the new employee's first name:",
                    validate:function(input){
                        if(input){
                            return true;
                        } else {
                            console.log(chalk.red('\n\tPlease enter a valid first name.'));
                            return false;
                        }
                    }
                },
                {
                    type:'input',
                    name:'empLastName',
                    message:"Enter the new employee's last name:",
                    validate:function(input){
                        if(input){
                            return true;
                        } else {
                            console.log(chalk.red('\n\tPlease enter a valid last name.'));
                            return false;
                        }
                    }
                },
                {
                    type:'list',
                    name:'empRole',
                    message:'Please choose a role for the employee from the list:',
                    choices:rList.map(item => item.title),
                    loop:false
                },
                {
                    type:'list',
                    name:'empManager',
                    message:'Please choose the name of the manger for the new employee from the list:',
                    choices:emploList.map(emp => `${emp.first_name} ${emp.last_name}`),
                    loop:false
                }
            ]).then(answer=>{
                const roleId = rList.filter(role => role.title === answer.empRole)[0].id;
                const empManagerId = empList.filter(emp => `${emp.first_name} ${emp.last_name}` === answer.empManager)[0].id;
                sql = `INSERT INTO employees (first_name, last_name, roles_id, manager_id)
                        VALUES (?,?,?,?);`;
                postData(sql, [answer.empFirstName, answer.empLastName, roleId, empManagerId]);
            })
        });
    });
}

function updateEmployee(){
    let sql = `SELECT * FROM roles;`;
    const rolesList = getTableData(sql);
    let rList;

    rolesList.then((roleList) =>{
        rList = roleList.map(role => {
            return {
                id:role.id,
                title:role.title
            }
        });
        // console.log(roleList);
        let sql = `SELECT * FROM employees;`;
        const employeeList = getTableData(sql);
        let empList;

        employeeList.then((emploList) => {
            empList = emploList.filter(emp => {
                return {
                    id:emp.id,
                    first_name:emp.first_name,
                    last_name:emp.last_name
                }
            })

            inquirer.prompt([  
                {
                    type:'list',
                    name:'empName',
                    message:'Please choose the name of the employee from the list:',
                    choices:emploList.map(emp => `${emp.first_name} ${emp.last_name}`),
                    loop:false
                },             
                {
                    type:'list',
                    name:'empRole',
                    message:'Please choose a role for the employee from the list:',
                    choices:rList.map(item => item.title),
                    loop:false
                }
            ]).then(answer=>{
                const roleId = rList.filter(role => role.title === answer.empRole)[0].id;
                const empId = empList.filter(emp => `${emp.first_name} ${emp.last_name}` === answer.empName)[0].id;
                sql = `UPDATE employees SET roles_id = ?
                        WHERE id = ?`;
                postData(sql, [roleId, empId]);
            })
        });
    });
}



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
                'Update an employee role',
                'Exit application'
            ],
            loop:false
        }
    ]).then(answer => {
        let sql;
        if (answer.task === 'View all departments') {
            sql = `SELECT * FROM departments;`
            getAllData(sql);
        } else if (answer.task === 'View all roles') {
            sql = `SELECT * FROM roles;`
            getAllData(sql);
        } else if (answer.task === 'View all employees') {
            sql = `SELECT * FROM employees;`
            getAllData(sql);
        } else if (answer.task === 'Add a department') {
            addNewDepartment();
        } else if(answer.task === 'Add a role' ){
            addNewRole();
        } else if (answer.task === 'Add an employee'){
            addNewEmployee();
        } else if(answer.task === 'Update an employee role'){
            updateEmployee();
        } else if(answer.task === 'Exit application'){
            db.end();
        }
    })
};

program();