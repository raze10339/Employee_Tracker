
import 'console.table';
import inquirer from "inquirer";
import { createEmployee, getAllEmployees, getAllRoles, createRole, getAllDepartments, createDepartment, updateEmployeeRoleInDB } from './query.js';

export async function showMainMenu() {
    let showWelcome = false;
    
    if (!showWelcome) {
        console.log('\nWhat would you like to do?\n');

        showWelcome = true;
    }
    const { optionFunction } = await inquirer.prompt({
        message: 'Please select an option',
        name: 'optionFunction',
        type: 'list',
        choices: [
            {
                name: 'view All Employees',
                value: viewAllEmployees
            },
            {
                name: 'Add Employee',
                value: addEmployee
            },
            {
                name: 'Update Employee Role',
                value: updateEmployeeRole
            },
            {
                name: 'view All Roles',
                value: showAllRoles
            },
            {
                name: 'Add Role',
                value: addRole
            },
            {
                name: 'View All Departments',
                value: showAllDepartments
            },
            {
                name: 'Add department',
                value: addDepartment
            },
            {
                name: 'Quit',
                value: 0
            }
        ]
    });

    if (!optionFunction) {
        console.log('\nThanks for using the Employee Tracker app!');
        process.exit();
    }
    await optionFunction();
    showMainMenu();
}

// Add a new employee
export async function addEmployee() {
    const rolesArray = await getAllRoles();
    const employeesArray = await getAllEmployees();
    const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
        {
            message: 'Enter the employee first name',
            name: 'first_name',
            type: 'input'
        },
        {
            message: 'Enter the employee last name',
            name: 'last_name',
            type: 'input'
        },
        {
            message: 'Please select the employee role',
            name: 'role_id',
            type: 'list',
            choices: rolesArray.map((roleObj: { title: string, id: number }) => {
                return {
                    name: roleObj.title,
                    value: roleObj.id
                }
            })
        },
        {
            message: 'Please select the employee manager (if any)',
            name: 'manager_id',
            type: 'list',
            choices: [
                { name: 'None', value: null },
                ...employeesArray.map((empObj: { first_name: string, last_name: string, id: number }) => {
                    return {
                        name: `${empObj.first_name} ${empObj.last_name}`,
                        value: empObj.id
                    }
                })
            ]
        }
    ]);

    await createEmployee(first_name, last_name, role_id, manager_id);
    console.log(`Employee added: ${first_name} ${last_name}, Role ID: ${role_id}, Manager ID: ${manager_id}`);
}

// Show all employees
export async function viewAllEmployees() {
    const employeeRowsArray = await getAllEmployees();
    console.table(employeeRowsArray);
}
//view All Roles
export async function showAllRoles() {
    const rolesArray = await getAllRoles();
    console.table(rolesArray);
}


export async function addRole() {
    // Get all departments to display to the user
    const departmentsArray = await getAllDepartments();

    const { title, salary, department_id } = await inquirer.prompt([
        {
            message: 'Enter the role title',
            name: 'title',
            type: 'input'
        },
        {
            message: 'Enter the role salary',
            name: 'salary',
            type: 'input',
            validate: (input: any) => {
                const salary = parseFloat(input);
                return !isNaN(salary) || 'Please enter a valid salary';
            }
        },
        {
            message: 'Select the department for this role',
            name: 'department_id',
            type: 'list',
            choices: departmentsArray.map((deptObj: { name: string, id: number }) => {
                return {
                    name: deptObj.name,
                    value: deptObj.id
                };
            })
        }
    ]);

    // Create the new role in the database
    await createRole(title, parseFloat(salary), department_id);

    console.log(`Role added: ${title} with salary: ${salary} in department ID: ${department_id}`);
}

//view all departments

export async function showAllDepartments() {
    const departmentsArray = await getAllDepartments();
    console.table(departmentsArray);
}

//View Add department

export async function addDepartment() {
    console.log("Add Department function called!");

    const { name } = await inquirer.prompt([
        {
            message: 'Enter the department name',
            name: 'name',
            type: 'input',
            validate: (input: string) => {
                return input.length > 0 || 'Please enter a valid department name';
            }
        }
    ]);
    await createDepartment(name);

    console.log(`Department added: ${name}`);
}

// Add Update Employee Role
export async function updateEmployeeRole() {

    const employeesArray = await getAllEmployees();
    console.log("Employees:", employeesArray);

    const rolesArray = await getAllRoles();
    console.log("Roles:", rolesArray);

    const { employee_id, new_role_id } = await inquirer.prompt([
        {
            message: 'Select the employee whose role you want to update',
            name: 'employee_id',
            type: 'list',
            choices: employeesArray.map((empObj: { first_name: string, last_name: string, id: number }) => {
                return {
                    name: `${empObj.first_name} ${empObj.last_name}`,
                    value: empObj.id
                };
            })
        },
        {
            message: 'Select the new role for this employee',
            name: 'new_role_id',
            type: 'list',
            choices: rolesArray.map((roleObj: { title: string, id: number }) => {
                return {
                    name: roleObj.title,
                    value: roleObj.id
                };
            })
        }
    ]);

    await updateEmployeeRoleInDB(employee_id, new_role_id);

    console.log(`Employee's role updated successfully!`);
}

