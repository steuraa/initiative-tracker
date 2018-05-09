var Encounter = require('../models/encounter');

exports.saveEncounter = function (req, res) {
    var mod = new Encounter(req.body);
    if (req.body.mode == "Save") {
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                res.send({ data: "Encounter has been Inserted..!!" });
            }
        });
    }
    else {
        Encounter.findByIdAndUpdate(req.body.id, {
            participants: req.body.participants,
            heroes: req.body.heroes,
            monsters: req.body.monsters,
        },
            function (err, data) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send({ data: "Encounter has been Updated..!!" });
                }
            });
    }
};

exports.getEncounter = function(req, res) {
    Encounter.findById(req.body.id)
    .populate('heroes')
    .populate('monsters')
    .exec(function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data)
        }
    });
}

exports.getAllEncounters = function(req, res) {
    Encounter.find(function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
};
