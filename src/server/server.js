const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongoose');

const encounterRouter = require('./routes/encounterRoutes');
const heroRouter = require('./routes/heroRoutes');
const monsterRouter = require('./routes/monsterRoutes');

const db = mongo.connect('mongodb://initiative_tracker_admin:initiative_tracker_password@ds119060.mlab.com:19060/initiative_tracker', function (err, response) {
    if (err) { console.log(err); }
    else { console.log('Connected to ' + db, '+', response); }
});

const app = express();
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
});
