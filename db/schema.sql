DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(18,2) NOT NULL,
    departments_id INTEGER NOT NULL,
    CONSTRAINT fk_rolesDepartment FOREIGN KEY (departments_id) REFERENCES departments(id)
);

CREATE TABLE employees (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    roles_id INTEGER NOT NULL,
    manager_id INTEGER,
    CONSTRAINT fk_employeesRoles FOREIGN KEY (roles_id) REFERENCES roles(id),
    CONSTRAINT fk_employeesManager FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL
);
