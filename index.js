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
            name: "name",
            message: "What is your name?"
        },
        {
            type: "input",
            name: "username",
            message: "What is your github username?"
        },
        {
            type: 'list',
            name: 'color',
            message: 'What is your favorite color?',
            choices: ["AliceBlue",
                "AntiqueWhite",
                "Aqua",
                "Aquamarine",
                "Azure",
                "Beige",
                "Bisque",
                "Black",
                "BlanchedAlmond",
                "Blue",
                "BlueViolet",
                "Brown",
                "BurlyWood",
                "CadetBlue",
                "Chartreuse",
                "Chocolate",
                "Coral",
                "CornflowerBlue",
                "Cornsilk",
                "Crimson",
                "Cyan",
                "DarkBlue",
                "DarkCyan",
                "DarkGoldenRod",
                "DarkGray",
                "DarkGrey",
                "DarkGreen",
                "DarkKhaki",
                "DarkMagenta",
                "DarkOliveGreen",
                "DarkOrange",
                "DarkOrchid",
                "DarkRed",
                "DarkSalmon",
                "DarkSeaGreen",
                "DarkSlateBlue",
                "DarkSlateGray",
                "DarkSlateGrey",
                "DarkTurquoise",
                "DarkViolet",
                "DeepPink",
                "DeepSkyBlue",
                "DimGray",
                "DimGrey",
                "DodgerBlue",
                "FireBrick",
                "FloralWhite",
                "ForestGreen",
                "Fuchsia",
                "Gainsboro",
                "GhostWhite",
                "Gold",
                "GoldenRod",
                "Gray",
                "Grey",
                "Green",
                "GreenYellow",
                "HoneyDew",
                "HotPink",
                "IndianRed",
                "Indigo",
                "Ivory",
                "Khaki",
                "Lavender",
                "LavenderBlush",
                "LawnGreen",
                "LemonChiffon",
                "LightBlue",
                "LightCoral",
                "LightCyan",
                "LightGoldenRodYellow",
                "LightGray",
                "LightGrey",
                "LightGreen",
                "LightPink",
                "LightSalmon",
                "LightSeaGreen",
                "LightSkyBlue",
                "LightSlateGray",
                "LightSlateGrey",
                "LightSteelBlue",
                "LightYellow",
                "Lime",
                "LimeGreen",
                "Linen",
                "Magenta",
                "Maroon",
                "MediumAquaMarine",
                "MediumBlue",
                "MediumOrchid",
                "MediumPurple",
                "MediumSeaGreen",
                "MediumSlateBlue",
                "MediumSpringGreen",
                "MediumTurquoise",
                "MediumVioletRed",
                "MidnightBlue",
                "MintCream",
                "MistyRose",
                "Moccasin",
                "NavajoWhite",
                "Navy",
                "OldLace",
                "Olive",
                "OliveDrab",
                "Orange",
                "OrangeRed",
                "Orchid",
                "PaleGoldenRod",
                "PaleGreen",
                "PaleTurquoise",
                "PaleVioletRed",
                "PapayaWhip",
                "PeachPuff",
                "Peru",
                "Pink",
                "Plum",
                "PowderBlue",
                "Purple",
                "RebeccaPurple",
                "Red",
                "RosyBrown",
                "RoyalBlue",
                "SaddleBrown",
                "Salmon",
                "SandyBrown",
                "SeaGreen",
                "SeaShell",
                "Sienna",
                "Silver",
                "SkyBlue",
                "SlateBlue",
                "SlateGray",
                "SlateGrey",
                "Snow",
                "SpringGreen",
                "SteelBlue",
                "Tan",
                "Teal",
                "Thistle",
                "Tomato",
                "Turquoise",
                "Violet",
                "Wheat",
                "White",
                "WhiteSmoke",
                "Yellow",
                "YellowGreen"
            ]
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
        <div class="jumbotron jumbotron-fluid" style="background-image: linear-gradient(white, ${answers.color});" >
            <div class="container ">
                <h1 class="display-4 text-center">Hi! My name is ${answers.name}</h1>
                <br>
                <div class="row d-flex justify-content-center">
                    <div class="card" style="width: 40rem;">
                        <img class="card-img-top" src=${response.data.avatar_url} alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">About Me</h5>
                            <p class="card-text">Location: ${response.data.location}</p>
                            <p class="card-text">Username: ${response.data.login}</p>
                            <p class="card-text">Blog: ${response.data.blog}</p>
                            <p class="card-text">Bio: ${response.data.bio}</p>
                            <p class="card-text">Number of public repos: ${response.data.public_repos}</p>
                            <p class="card-text">Follower count: ${response.data.followers}</p>
                            <p class="card-text">GitHub stars: Not currently available </p>
                            <p class="card-text">Users following: ${response.data.following}</p>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </body>
    
    </html>`;
}

const run = async () => {
    const html5ToPDF = new HTML5ToPDF({
        inputPath: path.join(__dirname, "output", "index.html"),
        outputPath: path.join(__dirname, "output", "output.pdf"),
        templatePath: path.join(__dirname, "templates", "basic"),
        template: "htmlbootstrap",
        include: [
            path.join(__dirname, "assets", "bootstrap-grid.css"),
            path.join(__dirname, "assets", "bootstrap-grid.css.map"),
            path.join(__dirname, "assets", "bootstrap-grid.min.css"),
            path.join(__dirname, "assets", "bootstrap-grid.min.css.map"),
            path.join(__dirname, "assets", "bootstrap-reboot.css"),
            path.join(__dirname, "assets", "bootstrap-reboot.css.map"),
            path.join(__dirname, "assets", "bootstrap-reboot.min.css"),
            path.join(__dirname, "assets", "bootstrap-reboot.min.css.map"),
            path.join(__dirname, "assets", "bootstrap.css"),
            path.join(__dirname, "assets", "bootstrap.css.map"),
            path.join(__dirname, "assets", "bootstrap.min.css"),
            path.join(__dirname, "assets", "bootstrap.min.css.map")

        ],
    })

    await html5ToPDF.start()
    await html5ToPDF.build()
    await html5ToPDF.close()
    console.log("DONE")
    process.exit(0)
};

promptUser()
    .then(function (answers) {
        axios.get('https://api.github.com/users/' + answers.username)
            .then(response => {
                console.log(response.data);
                const html = generateHTML(answers, response);

                return writeFileAsync("./output/index.html", html).then(function () {
                    setTimeout(() => { run(); }, 2000);
                });
            })
            .catch(error => {
                console.log(error);
            });
    })
    .then(function () {
        console.log("Successfully wrote to index.html");
    })
    .catch(function (err) {
        console.log(err);
    });


