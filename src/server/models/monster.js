const mongo = require('mongoose');
const Schema = mongo.Schema;

const MonsterSchema = new Schema({
  name: {type: String, required: true},
  creature_class: {type: String, required: true},
  description: {type: String, required: true},
  hp: {type: Number, required: true},
  ac: {type: Number, required: true},
  init_mod: {type: Number, required: true},
  abilities: [{type: String}]
});

const EncounterMonsterSchema = new Schema({
  name: {type: String, required: true},
  hp: {type: Number, required: true},
  ac: {type: Number, required: true},
  init_mod: {type: Number, required: true}
});

module.exports.EncounterMonster = EncounterMonsterSchema;

module.exports.Monster = mongo.model('Monster', MonsterSchema, 'monsters');
