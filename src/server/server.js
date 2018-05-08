var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongo = require('mongoose');

var Hero = require('./models/hero');
var Monster = require('./models/moster');
var Encounter = require('./models/encounter');

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

app.post("/api/SaveHero", function (req, res) {
    var mod = new Hero(req.body);
    if (req.body.mode == "Save") {
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                res.send({ data: "Record has been Inserted..!!" });
            }
        });
    }
    else {
        Hero.findByIdAndUpdate(req.body.id, {
            name: req.body.name,
            player: req.body.player,
            HP: req.body.HP,
            AC: req.body.AC,
            initiative_mod: req.body.initiative_mod
        },
            function (err, data) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send({ data: "Record has been Updated..!!" });
                }
            });


    }
})

app.post("/api/deleteUser", function (req, res) {
    Hero.findByIdAndRemove(req.body.id, function (err) {
        if (err) {
            res.send(err);
        }
        else {
            res.send({ data: "Record has been Deleted..!!" });
        }
    });
})



app.get("/api/getUser", function (req, res) {
    Hero.findById(req.body.id, function (err, data) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    });
})


app.listen(8080, function () {

    console.log('Example app listening on port 8080!')
})