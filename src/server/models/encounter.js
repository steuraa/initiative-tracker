var mongo = require('mongoose');
var Schema = mongo.Schema;

var EncounterSchema = new Schema({
    participants: { type: Number, min: 2 },
    heroes: [{type: Schema.Types.ObjectId, ref: Hero}],
    monsters: [{type: Schema.Types.ObjectId, ref: Monster}]
}, { versionKey: false });

EncounterSchema
.virtual('url')
.get(function() {
    return '/encounters/' + this._id;
});

module.exports = mongo.model('Encounter', EncounterSchema, 'encounters');