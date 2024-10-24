import client from '../config/connection.js';
export async function getAllEmployees() {
    const sql = `

SELECT 
    employee.id AS employee_id,
    employee.first_name,  
    employee.last_name,
    role.id AS role_id,
    role.title AS role_title,
    role.salary AS role_salary,
    department.id AS department_id,
    department.name AS department_name,
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
FROM employee
JOIN role
    ON employee.role_id = role.id
JOIN department
    ON role.department_id = department.id
LEFT JOIN employee AS manager
    ON employee.manager_id = manager.id;

    `;
    const { rows } = await client.query(sql);
    console.log('Retrieved employee rows:', rows);
    return rows;
}
export async function getAllDepartments() {
    const sql = `
    SELECT 
        id,
        name
    FROM department;
    `;
    const { rows } = await client.query(sql);
    console.log('Retrieved department rows:', rows);
    return rows;
}
export async function getAllRoles() {
    const sql = `
    SELECT 
        id,
        title,
        salary,
        department_id
    FROM role;
    `;
    const { rows } = await client.query(sql);
    return rows;
}
export async function createEmployee(first_name, last_name, role_id, manager_id) {
    const sql = `
    INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES ($1, $2, $3, $4);
    `;
    await client.query(sql, [first_name, last_name, role_id, manager_id]);
    console.log(`Created employee: ${first_name} ${last_name}`);
}
export async function createRole(title, salary, department_id) {
    const sql = `
    INSERT INTO role (title, salary, department_id)
    VALUES ($1, $2, $3);
    `;
    await client.query(sql, [title, salary, department_id]);
    console.log(`Role created: ${title} in department ID: ${department_id}`);
}
export async function createDepartment(name) {
    const sql = `
    INSERT INTO department (name)
    VALUES ($1);
    `;
    await client.query(sql, [name]);
    console.log(`Department created: ${name}`);
}
export async function updateEmployeeRoleInDB(employee_id, new_role_id) {
    const sql = `
    UPDATE employee
    SET role_id = $1
    WHERE id = $2;
    `;
    await client.query(sql, [new_role_id, employee_id]);
    console.log(`Updated employee (ID: ${employee_id}) to new role (ID: ${new_role_id})`);
}
//# sourceMappingURL=query.js.map