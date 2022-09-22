const db = require('../db/connection');
const cTable = require('console.table');

//GETS data from the database
function makeGetQuery (sql){
    db.query(sql, (err, rows) => {
        if(err){
            console.log(err.message);
            return;
        }
        console.table(rows);
    }); 
    db.end();
}

//ADDS data to the database
function makePostQuery (sql, params){
    db.query(sql, params, (err, result) => {
        if(err){
            console.log(err.message);
            return;
        }
        console.log(`${result.affectedRows} new record(s) added.` );
    });
    db.end();
}

//GETS all data from a specified table
function getAllData (tableName){
    let sql = '';
    if(tableName === 'departments'){
        sql = `SELECT * FROM departments;`;
        makeGetQuery(sql);
    } else if (tableName === 'roles'){
        sql = `SELECT * FROM roles;`;
        makeGetQuery(sql);
    } else if(tableName === 'employees'){
        sql = `SELECT * FROM employees;`;
        makeGetQuery(sql);
    } else {
        console.log('Invalid table name entered.');
        db.end();
    }    
}

//POSTS data to a specified table
function postData (tableName, body){
    let sql = '';
    let params = '';

    if(tableName === 'departments' && body.name){
        sql = `INSERT INTO departments (name)
                VALUES (?);`;            
        return makePostQuery(sql, body.name);

    } else if(tableName === 'roles' && body.title && body.salary && body.departments_id){
        sql = `INSERT INTO roles (title, salary, departments_id)
                VALUES (?, ?, ?);`;
        params = [body.title, parseFloat(body.salary), parseInt(body.departments_id)];
        return makePostQuery(sql, params);

    } else if(tableName === 'employees' && body.first_name && body.last_name && body.roles_id){
        sql = `INSERT INTO employees (first_name, last_name, roles_id, manager_id)
                VALUES (?, ?, ?, ?);`;
        params = [body.first_name, body.last_name, parseInt(body.roles_id), parseInt(body.manager_id) || null];
        return makePostQuery(sql, params);

    } else {
        console.log('Invalid table name or data provided');
        db.end();
    }
}

//Update an employee role
function updateEmployeeRole(emp_id, emp_role, manager_id = null){
    const sql = `UPDATE employees SET roles_id = ?, manager_id = ?
                    WHERE id = ?;`;
    const params = [parseInt(emp_role),parseInt(manager_id) || null, parseInt(emp_id)];

    db.query(sql, params, (err, result) => {
        if(err){
            console.log(err.message);
        }
        console.log(`${result.affectedRows} record updated.`);
    });
    db.end();
}

module.exports = {
    getAllData,
    postData,
    updateEmployeeRole
};