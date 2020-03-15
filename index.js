const HTML5ToPDF = require("html5-to-pdf");
const path = require("path");
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");


 




const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?"
    },
    {
      type: "input",
      name: "location",
      message: "Where are you from?"
    },
    {
      type: "input",
      name: "hobby",
      message: "What is your favorite hobby?"
    },
    {
      type: "input",
      name: "food",
      message: "What is your favorite food?"
    },
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub Username"
    },
    {
      type: "input",
      name: "linkedin",
      message: "Enter your LinkedIn URL."
    }
  ]);
}

function generateHTML(answers) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>Document</title>
</head>
<body>
  <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">Hi! My name is ${answers.name}</h1>
    <p class="lead">I am from ${answers.location}.</p>
    <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
    <ul class="list-group">
      <li class="list-group-item">My GitHub username is ${answers.github}</li>
      <li class="list-group-item">LinkedIn: ${answers.linkedin}</li>
    </ul>
  </div>
</div>
</body>
</html>`;
}

promptUser()
  .then(function(answers) {
    const html = generateHTML(answers);

    return writeFileAsync("./output/index.html", html);
  })
  .then(function() {
    console.log("Successfully wrote to index.html");
    const run = async () => {
        const html5ToPDF = new HTML5ToPDF({
          inputPath: path.join(__dirname, "output", "index.html"),
          outputPath: path.join(__dirname, "output", "output.pdf"),
          templatePath: path.join(__dirname, "templates", "basic"),
          template: "htmlbootstrap",
          include: [
          //   path.join(__dirname, "assets", "basic.css"),
          //   path.join(__dirname, "assets", "custom-margin.css"),
          ],
        })
       
        await html5ToPDF.start()
        await html5ToPDF.build()
        await html5ToPDF.close()
        console.log("DONE")
        process.exit(0)
      };
    run();
  })
  .catch(function(err) {
    console.log(err);
  });
 
 
