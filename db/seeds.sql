INSERT INTO departments (name) 
VALUES
    ('Engineering'),
    ('Manufacturing'),
    ('Accounting');

INSERT INTO roles (title, salary, departments_id)
VALUES 
    ('Manufacturing Engineer', 80000, 1),
    ('Design Engineer', 100000, 1),
    ('Welder', 90000, 2),
    ('CNC Machinist', 60000, 2),
    ('Accountant', 50000, 3);

INSERT INTO employees (first_name, last_name, roles_id, manager_id)
VALUES
    ('William', 'Shakespear', 3, NULL),
    ('William', 'Dafoe', 3, 1),
    ('John', 'Daniceguy', 3, 1),
    ('Captain', 'Knowitall', 2, NULL),
    ('Robin', 'Watson', 2, 4),
    ('Aero', 'Smith', 1, NULL),
    ('Smith', 'Machine', 1, 6),
    ('Jennifer', 'Connelly', 5, NULL),
    ('Shakira', 'Ripoll', 5, 8),
    ('Iron', 'Maiden', 4, NULL),
    ('Aluminum', 'Hayden', 4, 10);

