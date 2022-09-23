INSERT INTO departments (name) 
VALUES
    ('engineering'),
    ('manufacturing'),
    ('accounting');

INSERT INTO roles (title, salary, departments_id)
VALUES 
    ('manufacturing engineer', 80000, 1),
    ('design engineer', 100000, 1),
    ('welder', 90000, 2),
    ('cnc machinist', 60000, 2),
    ('accountant', 50000, 3);

INSERT INTO employees (first_name, last_name, roles_id, manager_id)
VALUES
    ('william', 'shakespear', 3, NULL),
    ('william', 'dafoe', 3, 1),
    ('john', 'daniceguy', 3, 1),
    ('captain', 'knowitall', 2, NULL),
    ('robin', 'watson', 2, 4),
    ('aero', 'smith', 1, NULL),
    ('smith', 'machine', 1, 6),
    ('jennifer', 'connelly', 5, NULL),
    ('shakira', 'ripoll', 5, 8),
    ('iron', 'maiden', 4, NULL),
    ('aluminum', 'hayden', 4, 10);

