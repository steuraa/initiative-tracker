const Encounter = require('../models/encounter.js').Encounter;

exports.saveEncounter = function (req, res) {
  const mod = new Encounter(req.body);
  if (req.body.mode === "Save") {
    mod.save(function (err, data) {
      if (err) {
        res.send(err);
      }
      else {
        res.status(201).send({body: data});
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
          res.status(200).send({body: data});
        }
      });
  }
};

exports.getEncounter = function (req, res) {
  if (req.body.id.match(/^[0-9a-fA-F]{24}$/)) {
    Encounter.findById(req.body.id)
    // .populate('heroes')
    // .populate('monsters')
      .exec(function (err, data) {
        if (err) {
          res.status(204).send(err);
        } else {
          if (data) {
            res.status(200).json({body: data});
          } else {
            res.status(200).json({body: []});
          }
        }
      });
  } else {
    res.status(404).json({error: {message: 'Wrong id-format'}});
  }
};

exports.getAllEncounters = function (req, res) {
  Encounter.find({}, 'name id', function (err, data) {
    if (err) {
      res.status(204).send(err);
    } else {
      res.status(200).json({body: data});
    }
  });
};
