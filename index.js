const HTML5ToPDF = require("html5-to-pdf");
const path = require("path");
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require('axios');








const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "username",
            message: "What is your github username?"
        },
        {
            type: "input",
            name: "color",
            message: "What is your favorite color?"
        }
    ]);
}


function generateHTML(answers, response) {
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
                <h1 class="display-4 text-center">Hi! My name is ${response.data.login}</h1>
                <br>
                <div class="row d-flex justify-content-center">
                    <div class="card" style="width: 40rem;">
                        <img class="card-img-top" src="https://avatars2.githubusercontent.com/u/56486939?v=4" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">About Me</h5>
                            <p class="card-text">User location via Google Maps</p>
                            <p class="card-text">User GitHub profile</p>
                            <p class="card-text">User blog</p>
                            <p class="card-text">User bio</p>
                            <p class="card-text">Number of public repositories</p>
                            <p class="card-text">Number of followers</p>
                            <p class="card-text">Number of GitHub stars</p>
                            <p class="card-text">Number of users following</p>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </body>
    
    </html>`;
}

promptUser()
    .then(function (answers) {
        axios.get('https://api.github.com/users/' + answers.username)
  .then(response => {
    console.log(response.data);
    
  })
  .catch(error => {
    console.log(error);
  });
    })
    .then(function (answers) {
        const html = generateHTML(answers);

        return writeFileAsync("./output/index.html", html);
    })
    .then(function () {
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
    .catch(function (err) {
        console.log(err);
    });


