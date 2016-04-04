var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var winston = require('winston');
var morgan = require('morgan');
var fs = require('fs');

var port = process.env.PORT || 8000;
var dbUri = process.env.MONGOLAB_URI || 'mongodb://localhost/apihackathon';

var app = express();

var characterRouter = require('./routers/characterRouter');

/* Configure the logger */
var logDir = './logs';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

var logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: logDir + '/all-logs.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: false
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
    })
  ],
  exitOnError: false
});

logger.stream = {
  write: function(message, encoding) {
    logger.info(message);
  }
};

// Logging and parsing
app.use(require('morgan')('combined', { 'stream': logger.stream }));

mongoose.connect(dbUri);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.json({message: 'Hack Reactor API Hackathon Example API'});
});

// TODO: Use the characterRouter as middleware on the '/api/characters' route
app.use('/api/characters', characterRouter);

app.listen(port, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('HR Hackathon Example API listening on ' + port);
});  

module.exports = app;
