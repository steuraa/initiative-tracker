var mongo = require('mongoose');
var Schema = mongo.Schema;

var HeroSchema = new Schema({
    name: { type: String, required: true },
    player: { type: String },
    HP: { type: Number, required: true },
    AC: { type: Number, required: true },
    initiative_mod: { type: Number, required: true },
}, { versionKey: false });

HeroSchema
.virtual('url')
.get(function() {
    return '/heroes/' + this._id;
});

module.exports =  mongo.model('Hero', HeroSchema, 'heroes');