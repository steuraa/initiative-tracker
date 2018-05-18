const Hero = require('../models/hero.js').Hero;

exports.saveHero = function (req, res) {
  const mod = new Hero(req.body);
  if (!req.body._id) {
    Hero.findOne({'name': req.body.name}, function (err) {
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
        res.status(404).json('Duplicate hero');
      }
    })
  }
  else {
    if (req.body._id.match(/^[0-9a-fA-F]{24}$/)) {
      Hero.findByIdAndUpdate(req.body._id, {
          name: req.body.name,
          avatar: req.body.avatar,
          player: req.body.player,
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
      res.status(404).json({error: {message: 'Wrong id-format'}});
    }
  }
};

exports.deleteHero = function (req, res) {
  Hero.findByIdAndRemove(req.body._id, function (err) {
    if (err) {
      res.send(err);
    }
    else {
      res.send({data: "Hero has been Deleted..!!"});
    }
  });
};

exports.getHero = function (req, res) {
  if (req.body._id.match(/^[0-9a-fA-F]{24}$/)) {
    Hero.findById(req.body._id, function (err, data) {
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

exports.getAllHeroes = function (req, res) {
  Hero.find({}, 'name ac hp id', function (err, data) {
    if (err) {
      res.status(204).send(err);
    } else {
      res.status(200).json({body: data});
    }
  });
};
