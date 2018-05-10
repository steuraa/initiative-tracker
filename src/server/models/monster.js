var mongo = require('mongoose');
var Schema = mongo.Schema;

var MonsterSchema = new Schema({
    name: { type: String, required: true },
    HP: { type: Number, min: 0, required: true },
    AC: { type: Number, required: true },
    initiative_mod: { type: Number, required: true },
}, { versionKey: false });

MonsterSchema
.virtual('url')
.get(function() {
    return '/monsters/' + this._id;
});


module.exports.Monster = mongo.model('Monster', MonsterSchema, 'monsters');
