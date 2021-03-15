const express = require('express');//using 'require' in order to use express
const data = require('./data.json');
const app = express(); //creates the express application

app.set('view engine', 'pug'); //setting express to use 'pug' templates engine in the views folder 

//setting a static route for images and stylesheets so they can be delivered to the browser and not processed by the app
app.use('/static', express.static('public'));
//app.use('/static', express.static('images'))
//rendering the index.pug from views
app.get('/', (req, res) => {
    //Also, setting the locals project object equel to data.projects
    res.render('index', { projects: data.projects });
});

//rending the about template and referencing the projects object
app.get('/about', (req, res) => {
    res.render('about');
});

//rendering the projects specific id
app.get("/projects/:id", (req, res) => {
    //targeting the parameter with the specific project id
    let projectId = req.params.id;
    //creating a variable for a single project
    let project = data.projects[projectId]
    console.log(projectId)
    // Object destructuring
    res.render('project', { project });
  });


//404 Error Handler
  app.use((req, res, next) => {
    // variable that holds error message inside the new Error class instance
    const error = new Error('Sorry, page not found.');
    error.status = 404;
    //asdf.fdsfd();  // checking the server side error
    console.log(`Error ${error.status}: ${error.message}`);
    next(error);
  });

  //Global error handler
  app.use((error, req, res, next) => {
    //comparing the error types and assigning to variable. Pretty much saying if error.status is undefined or if error.status is 500
    const errorStatus = error.status || 500;
    let errorMessage;
    if (errorStatus === 404 ) {
    //assigning to valued to equal the message from the error variable from earlier
      errorMessage = error.message;
    } else {
    //giving the variable a new message for 500 error
      errorMessage = "Oops. A server error occured!";
    }
    //setting the error status
    res.status(errorStatus);
    // rendering the error file and passing in the errorMessage variable into the object
    res.render('error', { errorMessage });

  });


  //listening on the localhost 3000 port
  app.listen(3000, () => {
      console.log('This app is running on localhost:3000');
  });