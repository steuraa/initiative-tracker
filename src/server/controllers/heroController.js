const Hero = require('../models/hero.js').Hero;

exports.saveHero = function (req, res) {
  const mod = new Hero(req.body);
  if (req.body.id) {
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
            res.status(200).send({body: data});
          }
        });
    } else {
      res.status(404).json({error: {message: 'Wrong id-format'}});
    }
  }
};

exports.deleteHero = function (req, res) {
  Hero.findByIdAndRemove(req.body.id, function (err) {
    if (err) {
      res.send(err);
    }
    else {
      res.send({data: "Hero has been Deleted..!!"});
    }
  });
};

exports.getHero = function (req, res) {
  if (req.body.id.match(/^[0-9a-fA-F]{24}$/)) {
    Hero.findById(req.body.id, function (err, data) {
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
  Hero.find(function (err, data) {
    if (err) {
      res.status(204).send(err);
    } else {
      res.status(200).json({body: data});
    }
  });
};
