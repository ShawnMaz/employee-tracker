const db = require('../db/connection');


function makePostQuery (sql, params){
    db.query(sql, params, (err, result) => {
        if(err){
            return {error:err.message};
        }
        return {
            message:'success',
            data:body
        }
    })
}

//GETS all data from a specified table
function getAllData (tableName){
    const sql = `SELECT * FROM ?`;
    
    db.query(sql, tableName, (err, rows) => {
        if(err){
            return {error:err.message};
        }
        return {
            message:'success',
            data:rows
        };
    });
}

//POSTS data to a specified table
function postData (tableName, body){
    const sql = '';
    const params = '';

    if(tableName === 'departments' && body.name){
        sql = `INSERT INTO departments (name)
                VALUES (?);`;            
        return makePostQuery(sql, body.name);

    } else if(tableName === 'roles' && body.title && body.salary && body.department_id){
        sql = `INSERT INTO roles (title, salary, department_id)
                VALUES (?, ?, ?);`;
        params = [body.title, parseFloat(body.salary), parseInt(body.department_id)];
        return makePostQuery(sql, params);

    } else if(tableName === 'employees' && body.first_name && body.last_name && body.roles_id && body.manager_id){
        sql = `INSERT INTO employees (first_name, last_name, roles_id, manager_id)
                VALUES (?, ?, ?, ?);`;
        params = [body.first_name, body.last_name, parseInt(body.roles_id), parseInt(body.manager_id) || null];
        return makePostQuery(sql, params);

    } else {
        return {
            error: 'Invalid table name or data provided'
        };
    }
}

//Update an employee role
function updateEmployeeRole(emp_id, emp_role){
    const sql = `UPDATE employees SET role = ?
                    WHERE id = ?;`;
    const params = [parseInt(emp_id), emp_role];

    db.query(sql, params, (err, result) => {
        if(err){
            return {
                error:err.message
            };
        }
        return {
            message:'success',
            data:{
                id:emp_id,
                role: emp_role
            },
            changes:result.affectedRows
        };
    });
}

module.exports = {
    getAllData,
    postData,
    updateEmployeeRole
};