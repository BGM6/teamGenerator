
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./lib/htmlRenderer");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Employee 
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const teamMembers = [];
let manager;
let teamTitle;

// Manager inquirer function and questions
function managerData() {
    inquirer.prompt([
        {
            type: "input",
            message: "Please provide your teams name: ",
            name: "teamTitle"
        },
        {
            type: "input",
            message: "Who is the manager of this project/team?",
            name: "managerName"
        },
        {
            type: "input",
            message: "Please provide the managers ID: ",
            name: "managerID"
        },
        {
            type: "input",
            message: "Please provide the managers email address: ",
            name: "managerEmail"
        },
        {
            type: "input",
            message: "Please provide the managers office number: ",
            name: "officeNumber"
        }]).then(managerResponse => {
            manager = new Manager(managerResponse.managerName, managerResponse.managerID, managerResponse.managerEmail, managerResponse.officeNumber);
            teamTitle = managerResponse.teamTitle;
            secondaryEmployeeData();
        });
}

// Secondary employee information getter
function secondaryEmployeeData() {
    inquirer.prompt([
        {
            type: "list",
            message: "What is this employee's role?",
            name: "employeeRole",
            choices: ["Intern", "Engineer"]
        },
        {
            type: "input",
            message: "What is the employee's name?",
            name: "employeeName"
        },
        {
            type: "input",
            message: "What is the employee's id?",
            name: "employeeId"
        },
        {
            type: "input",
            message: "What is the employee's email?",
            name: "employeeEmail"
        },
        {
            type: "input",
            message: "What is the Engineer's Github?",
            name: "github",
            when: (userInput) => userInput.employeeRole === "Engineer"
        },
        {
            type: "input",
            message: "What is the name of the school attended by the intern?",
            name: "school",
            when: (userInput) => userInput.employeeRole === "Intern"
        },
        {
            type: "confirm",
            name: "newEmployee",
            message: "Would you like to add another team member?"
        }
    ]).then(employeeAnswers => {
        if (employeeAnswers.employeeRole === "Intern") {
            const employee = new Intern(employeeAnswers.employeeName, employeeAnswers.employeeId, employeeAnswers.employeeEmail, employeeAnswers.school);
            teamMembers.push(employee);
        } else if (employeeAnswers.employeeRole === "Engineer") {
            teamMembers.push(new Engineer(employeeAnswers.employeeName, employeeAnswers.employeeId, employeeAnswers.employeeEmail, employeeAnswers.github));
        }
        if (employeeAnswers.newEmployee === true) {
            secondaryEmployeeData();
        } else {


            //Creates HTML
            let main = fs.readFileSync('./templates/main.html', 'utf8');
            main = main.replace(/{{teamTitle}}/g, teamTitle);

            let managerCard = fs.readFileSync('./templates/Manager.html', 'utf8');
            managerCard = managerCard.replace('{{name}}', manager.getName());
            managerCard = managerCard.replace('{{role}}', manager.getRole());
            managerCard = managerCard.replace('{{id}}', manager.getId());
            managerCard = managerCard.replace('{{email}}', manager.getEmail());
            managerCard = managerCard.replace('{{officeNumber}}', manager.getOfficeNumber());


            let cards = managerCard;
            for (let i = 0; i < teamMembers.length; i++) {
                let employee = teamMembers[i];
                cards += renderEmployee(employee);
            }
            main = main.replace('{{cards}}', cards);

            fs.writeFileSync('./output/team.html', main);
        }
    });
}

// renderEmployee function that is called above.

function renderEmployee(employee) {
    if (employee.getRole() === "Intern") {
        let internCard = fs.readFileSync('./templates/Intern.html', 'utf8');
        internCard = internCard.replace('{{name}}', employee.getName());
        internCard = internCard.replace('{{role}}', employee.getRole());
        internCard = internCard.replace('{{id}}', employee.getId());
        internCard = internCard.replace('{{email}}', employee.getEmail());
        internCard = internCard.replace('{{school}}', employee.getSchool());
        return internCard;
    } else if (employee.getRole() === "Engineer") {
        let engineerCard = fs.readFileSync('./templates/Engineer.html', 'utf8');
        engineerCard = engineerCard.replace('{{name}}', employee.getName());
        engineerCard = engineerCard.replace('{{role}}', employee.getRole());
        engineerCard = engineerCard.replace('{{id}}', employee.getId());
        engineerCard = engineerCard.replace('{{email}}', employee.getEmail());
        engineerCard = engineerCard.replace('{{github}}', employee.getGithub());
        return engineerCard;
    }
}

managerData();