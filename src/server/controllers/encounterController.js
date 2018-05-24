const Encounter = require('../models/encounter.js').Encounter;

exports.saveEncounter = function (req, res) {
  const mod = new Encounter(req.body);
  if (!req.body._id) {
    Encounter.findOne({'name': req.body.name}, function (err, encounter) {
      if (!encounter) {
        mod.save(function (err, data) {
          if (err) {
            res.send(err);
          }
          else {
            res.status(201).send({body: data});
          }
        });
      } else {
        res.status(400).json('An encounter with this name already exists or is in progress');
      }
    })
  }
  else {
    Encounter.findByIdAndUpdate(req.body._id, {
        name: req.body.name,
        round: req.body.round,
        heroes: req.body.heroes,
        monsters: req.body.monsters,
      }, {'new': true},
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
  if (req.body._id.match(/^[0-9a-fA-F]{24}$/)) {
    Encounter.findById(req.body._id)
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
    res.status(400).json({error: {message: 'Wrong id-format'}});
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
