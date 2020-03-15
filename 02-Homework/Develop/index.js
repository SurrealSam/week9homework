var generate = require('./generateHTML');
var fs = require('fs');

const questions = [
  
];

function writeToFile(fileName, data) {
 
}

function init() {
    var htmlfile = generate({color: "green"});
    fs.writeFile('index.html', htmlfile, function() {
        
    });
}
init();
