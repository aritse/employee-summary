const fs = require("fs");

card = function(employee) {
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
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${role}</h6>
      <h6 class="card-subtitle mb-2 text-muted">ID: ${id}</h6>
      <h6 class="card-subtitle mb-2 text-muted">${unique}</h6>
      <a href="${email}" class="card-link">${email}</a>
    </div>
  </div>`;
};

generate = function(cardGroup) {
  const template = ".\\templates\\template.html";
  const summary = ".\\output\\summary.html";
  fs.readFile(template, "utf8", (err, data) => {
    if (err) throw err;
    const html = data.replace("${cardGroup}", cardGroup);
    fs.writeFile(summary, html, "utf8", () => {
      console.log("created", summary);
    });
  });
};

module.exports = { card, generate };
