// HTTP SERVER
import express from 'express'
const app = express();

// Middleware
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'

// Helpers
import fs from 'fs'
import path from 'path'
import rfs from 'rotating-file-stream'

// Config
import config from './config';

function setPort(port = 5000) {
 app.set('port', parseInt(port, 10));
}

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(cors({
  origin: config.corsDomain, // Be sure to switch to your production domain
  optionsSuccessStatus: 200
}));

/************
 * LOGS 
 ************/
// Log all requests daily to one access.log log file per day
// Log only erroneous requests to console 

// create a rotating write stream
var accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
})

// log all requests to access.log
app.use(morgan('common', {
  stream: accessLogStream
}))

// log only 4xx and 5xx responses to console
app.use(morgan('dev', {
  skip: function (req, res) { return res.statusCode < 400 }
}))
/*************
 * END LOGS 
 *************/

/************
 * ROUTES 
 ************/
import ordersRouter from './routes/ordersRouter'

app.use('/api/orders', ordersRouter)
/************
 * END ROUTES 
 ************/

/*************
 * DATABASE
 *************/
import mongoose from 'mongoose'

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/diamond-exchange');
var db = mongoose.connection;

/*************
 * END DATABASE
 *************/
export default {
 getApp: () => app,
 setPort,
 listen
};

/*************
 * START SERVER
 *************/
function listen() {
  const port = app.get('port') || config.port;
  app.listen(port, () => {
    console.log(`The server is running and listening at http://localhost:${port}`);
  });
}