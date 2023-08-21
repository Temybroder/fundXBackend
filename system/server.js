const cluster = require('cluster');
const os = require('os');
const numOfCPUS = os.cpus().length;

const express = require('express');
const app = express();
const passport = require('passport');
const socket_io = require('socket.io');
const io = socket_io();
const session = require('express-session');

// MASTER DATABASE CONNECTION
const dbMain = require('../vars/db');
const environmentToExport = require('../config/config')


const server = () => {
  
// Connect to MongoDB
mongoose
  .connect(
    dbMain,
    { useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log('MongoDB :::=> Database Connected Successfully'))
  .catch(err => console.log(err));


// Passport Config
require('../api/v1/configurables/passport')(passport);
const apiErrorHandler = require('../api/v1/middlewares/errorManager/apiErrorHandler')


// KEYS for OAUTH 2 integration 
GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
GOOGLE_CLIENT_SECRET =  process.env.GOOGLE_CLIENT_SECRET;


// Express body parser
app.use(express.urlencoded({ extended: true }));


// Express session
app.use(
  session({
    secret:  process.env.session_secret,
    resave: true,
    saveUninitialized: true,
    // store: 
   })
 );


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Error Manager
app.use(apiErrorHandler);

// Global variables  
app.use(function(req, res, next) {
  res.locals.success_msg = "Successfully Completed";
  res.locals.error_msg = "There was an unexpected error";
  next();
});


// Routes
app.use('/', require('../api/v1/routes/Index/Index.js'));
app.use('/auth', require('../api/v1/routes/Auth/Authentication.js'));
app.use('/ta', require('../api/v1/routes/Transactions/Accounting/Transaction_Accounting.js'));
app.use('/cat', require('../api/V1/routes/Transactions/Funder/Agent_Transaction.js'))
app.use('/tu', require('../api/v1/routes/Transactions/User/User_Transaction.js'));
app.use('/a', require('../api/v1/routes/Admin/Admin.js'));
app.use('/q', require('../api/v1/routes/Search/Search_queries.js'));
app.use('/m', require('../api/V1/routes/Match/requestMatch.js'));

const PORT = process.env.PORT || 7000;

app.io = io.on("connection", function(socket){
	console.log("Socket connected with id " + socket.id);
  // List of Socket events are
  // 1. initFundingRequest  - This is by user
  // 2. initRequestFunderRes  -  This is from Funders
  // 3. 
  socket.on("initRequestFunderRes", (payload) => {
    console.log(payload)
  })
  io.emit('funderResponse', 'Server is thanking you from here')
  socket.on('initFundingRequest', (payload) => {
    console.log(payload)
   })
socket.on('funderDecision', (content) => {
  if(content == 'funderAccept'){

    } else 
    if (content == 'funderReject') {
  // Emit rejection message to Requesting user
  io.emit('FunderResServerResponse', 'funderReject')
  }
})
})


// RUNNING CLUSTERS SEPARATELY
if(cluster.isMaster){
  for (let i = 0; i < numOfCPUS; i++){
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    cluster.fork();
    console.log(`Worker Process ${worker.process.pid} died`)
  })
} else {
  _connectDb();
    io.listen(app.listen(PORT, console.log(`Socket, Express Server on process ${process.pid}, started on port ${PORT}. Database Started`)));
  }
}

module.exports = server;