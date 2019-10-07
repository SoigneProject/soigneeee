var mongoose = require('mongoose');
var express = require('express'),
  app = express(),
  port = process.env.PORT || 6969,
  userRoute = require('./api/routes/userRoute'),
  bodyParser = require('body-parser');

const uri = "mongodb+srv://Test:Test123@cs160-cluster-gigd4.mongodb.net/Soigne?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let db = mongoose.connection;
// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Register routes
userRoute(app);

// Error message for 404
app.use(function (req, res) {
  res.status(404).send("Sorry can't find that!");
});

app.listen(port);

console.log('soigne server started on: ' + port);