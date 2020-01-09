const inquirer = require("inquirer");

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const HTML = require("./lib/html");
const generate = HTML.generate;
const card = HTML.card;

const roles = ["Manager", "Engineer", "Intern"];
const questions = [
  { type: "input", name: "name", message: "What is the employee's name?" },
  { type: "input", name: "id", message: "What is the employee's ID?" },
  { type: "input", name: "email", message: "What is the employee's email?" }
];

async function app() {
  const employees = [];
  let more = true;
  while (more) {
    const { role } = await inquirer.prompt([{ type: "list", name: "role", message: "role?", choices: [...roles, "Exit"] }]);
    switch (role) {
      case "Manager":
        const manager = await inquirer.prompt([...questions, { type: "input", name: "office", message: "What is the manager's office number?" }]);
        employees.push(new Manager(manager.name, manager.id, manager.email, manager.office));
        break;
      case "Engineer":
        const engineer = await inquirer.prompt([...questions, { type: "input", name: "github", message: "What is the engineer's Github username?" }]);
        employees.push(new Engineer(engineer.name, engineer.id, engineer.email, engineer.github));
        break;
      case "Intern":
        const intern = await inquirer.prompt([...questions, { type: "input", name: "school", message: "What is the intern's school name?" }]);
        employees.push(new Intern(intern.name, intern.id, intern.email, intern.school));
        break;
      case "Exit":
        more = false;
        break;
    }
  }

  const cards = employees.map(employee => card(employee));
  generate(cards.join(""));
}

app();
