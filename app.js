const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const fs = require('fs');
const { json } = require('express');

//View engine set to pug
app.set('view engine', 'pug');

//Using body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

//Static route to the main folder
app.use(express.static(__dirname + '/'));


//Index page
app.get('/', (req, res) => {
    let description = "This portfolio showcase my accomplishments as a Web Developer, specially but not limited to JavaScript using Node, Pug, Express, jQuery.";
    //Read JSON data file and load project objects in the page
    var rawData = fs.readFileSync('data.json');
    var projects = JSON.parse(rawData);
    res.render('index', {description: description, projects: projects });
});


//Layout page = side panel of all the pages 
app.get('/layout', (req, res) => {
    let name = "Paulo Gustavo Rech";
    res.render('layout', { name: name});
});


//About page
app.get('/about', (req, res) => {
    let name = "Paulo Gustavo Rech";
    let tel = "(236) 865-5300";
    let email = "rech.paulog@gmail.com";
    let linkedIn = "https://www.linkedin.com/in/paulo-gustavo-rech/";
    let gitHub = "https://github.com/paulorech";
    let facebook = "https://www.facebook.com/paulo.rech";
    res.render('about', { name: name, linkedIn: linkedIn, gitHub: gitHub, facebook: facebook, tel: tel, email: email });
});


//Project page
app.get('/:id', function (req, res, next) {
    //Read JSON data file and load project objects in the page
    var rawData = fs.readFileSync('data.json');
    let projects = JSON.parse(rawData);
    res.render('project', { id: req.params.id, projects: projects[req.params.id] });
    next();
});

//Console started
app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});