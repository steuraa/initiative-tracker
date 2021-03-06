const Monster = require('../models/monster').Monster;

exports.saveMonster = function (req, res) {
  const mod = new Monster(req.body);
  if (!req.body._id) {
    Monster.findOne({'name': req.body.name}, function (err) {
      if (!err) {
        mod.save(function (err, data) {
          if (err) {
            res.status(400).send(err);
          }
          else {
            res.status(201).send({body: data});
          }
        });
      } else {
        res.status(400).json('A monster with this name already exist');
      }
    });
  }
  else {
    if (req.body._id.match(/^[0-9a-fA-F]{24}$/)) {
      Monster.findByIdAndUpdate(req.body._id, {
          name: req.body.name,
          avatar: req.body.avatar,
          creature_class: req.body.creature_class,
          description: req.body.description,
          hp: req.body.hp,
          ac: req.body.ac,
          init_mod: req.body.init_mod,
          abilities: req.body.abilities
        }, {'new': true},
        function (err, data) {
          if (err) {
            res.status(400).send(err);
          }
          else {
            res.status(200).send({body: data});
          }
        });
    } else {
      res.status(400).json({error: {message: 'Wrong id-format'}});
    }
  }
};

exports.deleteMonster = function (req, res) {
  Monster.findByIdAndRemove(req.body._id, function (err) {
    if (err) {
      res.send(err);
    }
    else {
      res.send({data: "Monster has been Deleted..!!"});
    }
  });
};

exports.getMonster = function (req, res) {
  if (req.body._id.match(/^[0-9a-fA-F]{24}$/)) {
    Monster.findById(req.body._id, function (err, data) {
      if (err) {
        res.status(400).send(err);
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

exports.getAllMonsters = function (req, res) {
  Monster.find({}, 'name ac hp id', function (err, data) {
    if (err) {
      res.status(204).send(err);
    } else {
      res.status(200).json({body: data});
    }
  });
};
