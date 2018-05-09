var Monster = require('../models/monster');

exports.saveMonster = function (req, res) {
    var mod = new Monster(req.body);
    if (req.body.mode == "Save") {
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                res.send({ data: "Monster has been Inserted..!!" });
            }
        });
    }
    else {
        Monster.findByIdAndUpdate(req.body.id, {
            name: req.body.name,
            HP: req.body.HP,
            AC: req.body.AC,
            initiative_mod: req.body.initiative_mod
        },
            function (err, data) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send({ data: "Monster has been Updated..!!" });
                }
            });


    }
};

exports.deleteMonster = function (req, res) {
    Monster.findByIdAndRemove(req.body.id, function (err) {
        if (err) {
            res.send(err);
        }
        else {
            res.send({ data: "Monster has been Deleted..!!" });
        }
    });
};

exports.getMonster = function (req, res) {
    Monster.findById(req.body.id, function (err, data) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    });
};

exports.getAllMonsters = function(req, res) {
    Monster.find(function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
};
