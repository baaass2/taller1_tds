const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require('passport')
const bodyParser = require("body-parser")
const path = require("path")
const config = require("./config/database")




require('./api/models/index');

const app = express();
const port = 3000;

const api = require("./api/rutas");

//mongoose.Promise = global.Promise;
mongoose.set('debug', true);
mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
	console.log('Database ON')
});

app.use(cors());


app.use(bodyParser.json());
app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", api);

app.listen(port, () => {
	console.log("SERVIDOR OPERATIVO");
});

app.get('/', (req, res) => {
	res.send('Invalid Endpoint');
})

module.exports = app;