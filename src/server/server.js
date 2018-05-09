var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongo = require('mongoose');

// var Hero = require('./models/hero');
// var Monster = require('./models/monster');
// var Encounter = require('./models/encounter');
var encounterRouter = require('./routes/encounterRoutes');
var heroRouter = require('./routes/heroRoutes');
var monsterRouter = require('./routes/monsterRoutes');

var db = mongo.connect('mongodb://initiative_tracker_admin:initiative_tracker_password@ds119060.mlab.com:19060/initiative_tracker', function (err, response) {
    if (err) { console.log(err); }
    else { console.log('Connected to ' + db, '+', response); }
});

var app = express();
app.use(bodyParser());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/api', heroRouter);
app.use('/api', monsterRouter);
app.use('/api', encounterRouter);

app.listen(8080, function () {

    console.log('Example app listening on port 8080!')
})