\c employee_tracker;


INSERT INTO department (name) VALUES 
('Human Resources'),
('Engineering'),
('Marketing'),
('sales')
ON CONFLICT (name) DO NOTHING;

INSERT INTO role (title, salary, department_id) VALUES
('HR Manager', 80000, 1),
('Software Engineer', 90000, 2),
('Marketing Specialist', 60000, 3),
('Sales Representative', 70000, 4)
ON CONFLICT (title) DO NOTHING;

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),    -- HR Manager with no manager
('Jane', 'Smith', 2, 1),     -- Software Engineer managed by John Doe
('Mike', 'Johnson', 3, NULL),-- Marketing Specialist with no manager
('Sara', 'Connor', 4, 2),    -- Sales Representative managed by Jane Smith
('Bob', 'Brown', 2, 1),      -- Software Engineer managed by John Doe
ON CONFLICT DO NOTHING;
