const Hero = require('../models/hero.js').Hero;

exports.saveHero = function (req, res) {
  const mod = new Hero(req.body);
    if (req.body.mode === "Save") {
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                res.send({ data: "Hero has been Inserted..!!" });
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
                    res.send({ data: "Hero has been Updated..!!" });
                }
            });


    }
};

exports.deleteHero = function (req, res) {
    Hero.findByIdAndRemove(req.body.id, function (err) {
        if (err) {
            res.send(err);
        }
        else {
            res.send({ data: "Hero has been Deleted..!!" });
        }
    });
};

exports.getHero = function (req, res) {
    Hero.findById(req.body.id, function (err, data) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    });
};

exports.getAllHeroes = function(req, res) {
    Hero.find(function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
};
