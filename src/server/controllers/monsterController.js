const Monster = require('../models/monster').Monster;

exports.saveMonster = function (req, res) {
  const mod = new Monster(req.body);
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
    if (req.body.id.match(/^[0-9a-fA-F]{24}$/)) {
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
            res.status(200).send({body: data});
          }
        });
    } else {
      res.status(404).json({error: {message: 'Wrong id-format'}});
    }
  }
};

exports.deleteMonster = function (req, res) {
  Monster.findByIdAndRemove(req.body.id, function (err) {
    if (err) {
      res.send(err);
    }
    else {
      res.send({data: "Monster has been Deleted..!!"});
    }
  });
};

exports.getMonster = function (req, res) {
  if (req.body.id.match(/^[0-9a-fA-F]{24}$/)) {
    Monster.findById(req.body.id, function (err, data) {
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

exports.getAllMonsters = function (req, res) {
  Monster.find(function (err, data) {
    if (err) {
      res.status(204).send(err);
    } else {
      res.status(200).json({body: data});
    }
  });
};
