// imports 
const http = require('http')
const express = require('express') 
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const appConfig = require('./config/appConfig')
const blogRoutes = require('./routes/blog')
const appErrorHandler = require('./middlewares/appErrorHandler')
const routeLogger = require('./middlewares/routeLogger')
var helmet = require('helmet')
const logger = require('./libs/loggerLib')


// creating application instance 
const app = express()

//middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(appErrorHandler.globalErrorHandler)
app.use(routeLogger.logIp)
app.use(helmet())

// defining routers 
app.use(blogRoutes)

// not found routes
app.use(appErrorHandler.globalNotFoundHandler)


/* Create HTTP server.
*/

const server = http.createServer(app)
// start listening to http server
console.log(appConfig)
server.listen(appConfig.port)
server.on('error', onError)
server.on('listening', onListening)

// end server listening code

/**
* Event listener for HTTP server "error" event.
*/

function onError(error) {
   if (error.syscall !== 'listen') {
       logger.error(error.code + ' not equal listen', 'serverOnErrorHandler', 10)
       throw error
   }

   // handle specific listen errors with friendly messages
   switch (error.code) {
       case 'EACCES':
           logger.error(error.code + ':elavated privileges required', 'serverOnErrorHandler', 10)
           process.exit(1)
           break
       case 'EADDRINUSE':
           logger.error(error.code + ':port is already in use.', 'serverOnErrorHandler', 10)
           process.exit(1)
           break
       default:
           logger.error(error.code + ':some unknown error occured', 'serverOnErrorHandler', 10)
           throw error
   }
}

/**
* Event listener for HTTP server "listening" event.
*/

function onListening() {
   var addr = server.address()
   var bind = typeof addr === 'string'
       ? 'pipe ' + addr
       : 'port ' + addr.port;
   ('Listening on ' + bind)
   logger.info('server listening on port' + addr.port, 'serverOnListeningHandler', 10)
   let db = mongoose.connect(appConfig.db.uri)
}

process.on('unhandledRejection', (reason, p) => {
   console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
   // application specific logging, throwing an error, or other logic here
})


// handling mongoose connection error
mongoose.connection.on('error', function (err) {
   console.log('database connection error');
   console.log(err)

}); // end mongoose connection error

// handling mongoose success event
mongoose.connection.on('open', function (err) {
   if (err) {
       console.log("database error");
       console.log(err);

   } else {
       console.log("database connection open success");
   }

}); // end mongoose connection open handler