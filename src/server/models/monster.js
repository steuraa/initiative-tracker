var mongo = require('mongoose');
var Schema = mongo.Schema;

var MonsterSchema = new Schema({
  name: {type: String, required: true},
  creature_class: {type: String, required: true},
  description: {type: String, required: true},
  hp: {type: Number, required: true},
  ac: {type: Number, required: true},
  init_mod: {type: Number, required: true},
  abilities: [{type: String}]
}, {versionKey: false});

MonsterSchema
  .virtual('url')
  .get(function () {
    return '/monsters/' + this._id;
  });


module.exports.Monster = mongo.model('Monster', MonsterSchema, 'monsters');
