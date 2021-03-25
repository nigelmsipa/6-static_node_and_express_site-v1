/** @format */

const express = require('express');
const data = require('./data.json');
const app = express();

//set pug as the template engine
app.set('view engine', 'pug');

// set route static assets so they dont have to be processed by the app
app.use('/static', express.static('public'));

// rendering index.pug template
app.get('/', (req, res) => {
  res.render('index', { projects: data.projects });
});

// rendering about.pug template
app.get('/about', (req, res) => {
  res.render('about');
});

// rendering each project
app.get('/projects/:id', (req, res) => {
  let projectId = req.params.id;
  let project = data.projects[projectId];
  console.log(projectId);
  res.render('project', { project });
});

//Handler for 404 errors
app.use((req, res, next) => {
  const error = new Error('Bad news, page not found.');
  error.status = 404;
  console.log(`Error ${error.status}: ${error.message}`);
  next(error);
});

//Handler for global errors
app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  let errorMessage;
  if (errorStatus === 404) {
    errorMessage = error.message;
  } else {
    errorMessage = 'I have bad news for you. A internal server error occured!';
  }
  res.status(errorStatus);
  res.render('error', { errorMessage });
});

//listening on the localhost 3000 port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});
