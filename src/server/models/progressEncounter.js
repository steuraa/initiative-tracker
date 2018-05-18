const mongo = require('mongoose');
const EncounterHero = require('./hero').EncounterHero;
const EncounterMonster = require('./monster').EncounterMonster;
const Encounter = require('./encounter').Encounter;
const Schema = mongo.Schema;

const ProgressEncounterSchema = new Schema({
  name: {type: String, required: true},
  round: {type: Number, required: true},
  original: {type: Schema.Types.ObjectId, ref: 'Encounter'},
  heroes: [EncounterHero],
  monsters: [EncounterMonster]
});

module.exports.ProgressEncounter = mongo.model('ProgressEncounter', ProgressEncounterSchema, 'progress_encounters');
