const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const generate = require("./lib/generate");

const roles = ["Manager", "Engineer", "Intern"];
const questions = [
  { type: "input", name: "name", message: "name?" },
  { type: "input", name: "id", message: "id?" },
  { type: "input", name: "email", message: "email?" }
];

async function app() {
  const employees = [];
  let more = true;
  while (more) {
    const { role } = await inquirer.prompt([{ type: "list", name: "role", message: "role?", choices: [...roles, "Exit"] }]);
    switch (role) {
      case "Manager":
        const m = await inquirer.prompt([...questions, { type: "input", name: "office", message: "office?" }]);
        employees.push(new Manager(m.name, m.id, m.email, m.office));
        break;
      case "Engineer":
        const e = await inquirer.prompt([...questions, { type: "input", name: "github", message: "github?" }]);
        employees.push(new Engineer(e.name, e.id, e.email, e.github));
        break;
      case "Intern":
        const i = await inquirer.prompt([...questions, { type: "input", name: "school", message: "school?" }]);
        employees.push(new Intern(i.name, i.id, i.email, i.school));
        break;
      case "Exit":
        more = false;
        break;
    }
  }
  console.log(employees);
  //   const page = generate(employees);
  //   fs.writeFile("employees.html", page, "utf8", () => {
  //     console.log("created employees.html");
  //   });
}

app();
