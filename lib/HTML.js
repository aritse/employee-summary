const fs = require("fs");

const card = function(employee) {
  let unique;
  const { name, id, email, role } = employee;

  switch (role) {
    case "Manager":
      unique = `Office: ${employee.office}`;
      break;
    case "Engineer":
      unique = `Github: ${employee.github}`;
      break;
    case "Intern":
      unique = `School: ${employee.school}`;
      break;
  }

  return `
  <div class="card mb-3" style="max-width: 18rem;">
    <div class="card-header bg-transparent border-success">
      Employee ID: ${id}
    </div>
    <div class="card-body text-white ${role === "Manager" ? "bg-success" : role === "Engineer" ? "bg-primary" : "bg-secondary"}">
      <h5 class="card-title">${name}</h5>
      <p class="card-text">${role}</p>
      <p class="card-text">${unique}</p>
    </div>
    <div class="card-footer bg-transparent border-success">
      <a href="${email}" class="card-link">
        ${email}
      </a>
    </div>
  </div>
  `;
};

const generate = function(cardGroup) {
  const template = ".\\templates\\template.html";
  const summary = ".\\output\\summary.html";
  fs.readFile(template, "utf8", (err, data) => {
    if (err) throw err;
    const html = data.replace("${cardDeck}", cardGroup);
    fs.writeFile(summary, html, "utf8", () => {
      console.log("created", summary);
    });
  });
};

module.exports = { card, generate };
