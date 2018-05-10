const mongo = require('mongoose');
const Hero = require('./hero');
const Monster = require('./monster');
const Schema = mongo.Schema;

const EncounterSchema = new Schema({
    name: { type: String, required: true },
    participants: { type: Number, min: 2 },
    heroes: ['Hero'],
    monsters: ['Monster']
}, { versionKey: false });

EncounterSchema
.virtual('url')
.get(function() {
    return '/encounters/' + this._id;
});

module.exports = mongo.model('Encounter', EncounterSchema, 'encounters');
