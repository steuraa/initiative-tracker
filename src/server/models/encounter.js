const mongo = require('mongoose');
const EncounterHero = require('./hero').EncounterHero;
const EncounterMonster = require('./monster').EncounterMonster;
const Schema = mongo.Schema;

const EncounterSchema = new Schema({
  name: {type: String, required: true},
  round: {type: Number, required: true},
  heroes: [EncounterHero],
  monsters: [EncounterMonster]
});

module.exports.Encounter = mongo.model('Encounter', EncounterSchema, 'encounters');
