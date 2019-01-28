'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const errorHandler = require( './middleware/500.js');
const notFound = require( './middleware/404.js' );
const authRouter = require( './auth/router.js' );

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Routes
app.use(authRouter);

/*
//newmiddleware
const mw = (words) => {
  return (req,res,next) => {  //returns the function that it will become based on the value passed.
  req.words = 'words';
  next();
} //WATCH VIDEO!!!!!!
}
app.get('/hi', mw ('hello world') => {  //mw to be called, added to stack
  res.status(200).send(req.words);
})

app.get('/test', mw('testing 123'), (req,res,next) => { //runs as route gets registered
  res.status(200).send(req.words);
})
*/

// Catchalls
app.use(notFound);
app.use(errorHandler);

let isRunning = false;

module.exports = {
  server: app,
  start: (port) => {
    if( ! isRunning ) {
      app.listen(port, () => {
        isRunning = true;
        console.log(`Server Up on ${port}`);
      });
    }
    else {
      console.log('Server is already running');
    }
  },
};
