const mongo = require('mongoose');
const Schema = mongo.Schema;

const HeroSchema = new Schema({
  name: {type: String, required: true},
  avatar: {type: String},
  player: {type: String},
  creature_class: {type: String, required: true},
  description: {type: String, required: true},
  hp: {type: Number, required: true},
  ac: {type: Number, required: true},
  init_mod: {type: Number, required: true},
  abilities: [{type: String}]

});

const EncounterHeroSchema = new Schema({
  original_id: {type: String, required: true},
  name: {type: String, required: true},
  player: {type: String, required: true},
  hp: {type: Number, required: true},
  max_hp: {type: Number, required: true},
  ac: {type: Number, required: true},
  max_ac: {type: Number, required: true},
  init_mod: {type: Number, required: true},
  initiative: {type: Number, required: true}
});

module.exports.EncounterHero = EncounterHeroSchema;

module.exports.Hero = mongo.model('Hero', HeroSchema, 'heroes');
