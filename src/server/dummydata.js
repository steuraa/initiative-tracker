#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async')
var Hero = require('./models/hero')
var Monster = require('./models/monster')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var heroes = []
var monsters = []

function heroCreate(name, player, HP, AC, initiative_mod, cb) {
  hero = {name:name , HP: HP, AC: AC, initiative_mod: initiative_mod };
  if (player != false) hero.player = player
  
  var hero = new Hero(hero);
       
  hero.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Hero: ' + hero);
    heroes.push(hero)
    cb(null, hero)
  }  );
}

function monsterCreate(name, HP, AC, initiative_mod, cb) {
  var monster = new Monster({name:name , HP: HP, AC: AC, initiative_mod: initiative_mod });
       
  monster.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Monster: ' + monster);
    monsters.push(monster)
    cb(null, monster);
  }   );
}


function createHeroes(cb) {
    async.parallel([
        function(callback) {
          heroCreate('Ellumyr', false, 8, 12, 0, callback);
        },
        function(callback) {
          heroCreate('Gregorr', false, 12, 17, 0, callback);
        },
        function(callback) {
          heroCreate('Shem', false, 11, 18, 2, callback);
        },
        function(callback) {
          heroCreate('Underfoot', false, 9, 14, 3, callback);
        },
        ],
        // optional callback
        cb);
}


function createMonsters(cb) {
    async.parallel([
        function(callback) {
          monsterCreate('Drow', 13, 15, 0, callback);
        },
        function(callback) {
          monsterCreate('Badger', 3, 10, 0, callback);
        },
        function(callback) {
          monsterCreate('Giant Rat', 7, 12, 0, callback);
        },
        function(callback) {
          monsterCreate('Skeleton', 13, 13, 0, callback);
        },
        ],
        // optional callback
        cb);
}





async.series([
    createHeroes,
    createMonsters
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Monsters: '+ monsters);
        console.log('Heroes: '+ heroes);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



