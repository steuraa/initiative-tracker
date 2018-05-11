#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
console.log(userArgs[0]);
if (!userArgs[0].startsWith('mongodb://')) {
  console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
  return
}
const async = require('async');
const Hero = require('./models/hero').Hero;
const Monster = require('./models/monster').Monster;


const mongoose = require('mongoose');
const mongoDB = userArgs[0];
// noinspection JSIgnoredPromiseFromCall
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
// noinspection JSUnusedLocalSymbols
const db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

const heroes = [];
const monsters = [];

function heroCreate(name, player, creature_class, description, hp, ac, init_mod, abilities, cb) {
  let tempHero = {
    name: name,
    creature_class: creature_class,
    description: description,
    hp: hp,
    ac: ac,
    init_mod: init_mod
  };
  if (player !== false) tempHero.player = player;
  if (abilities !== false) tempHero.abilities = abilities;

  const hero = new Hero(tempHero);

  hero.save(function (err) {
    if (err) {
      cb(err, null);
      return
    }
    console.log('New Hero: ' + hero);
    heroes.push(hero);
    cb(null, hero)
  });
}

function monsterCreate(name, creature_class, description, hp, ac, init_mod, abilities, cb) {
  let tempMonster = {
    name: name,
    creature_class: creature_class,
    description: description,
    hp: hp,
    ac: ac,
    init_mod: init_mod
  };
  if (abilities !== false) tempMonster.abilities = abilities;
  const monster = new Monster(tempMonster);

  monster.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Monster: ' + monster);
    monsters.push(monster);
    cb(null, monster);
  });
}


function createHeroes(cb) {
  async.parallel([
      function (callback) {
        heroCreate('Ellumyr', false, 'Elven mage', 'Fireball throwing badass!', 8, 12, 0, ['Fireball', 'Ignite'], callback);
      },
      function (callback) {
        heroCreate('Gregorr', false, 'Human Paladin', 'For the light!', 12, 17, 0, ['Shieldbash', 'Smite'], callback);
      },
      function (callback) {
        heroCreate('Shem', false, 'Dwarven cleric', 'OUT OF MANA!', 11, 18, 2, ['Cure minor wounds', 'Cleanse'],callback);
      },
      function (callback) {
        heroCreate('Underfoot', false, 'Halfling rogue', 'Midget. Dangerous midget.', 9, 14, 3, ['Stab', 'Sneak'], callback);
      },
      function (callback) {
        heroCreate('Minmax', false, 'Human warrior', 'No int, just strength.', 9, 14, -3, ['Charge', 'Swing'], callback);
      },
      function (callback) {
        heroCreate('Complainsofnames', false, 'Goblin warrior', 'Can\'t stand Minmax.', 9, 14, 3, ['Slash', 'Jump'], callback);
      },
    ],
    // optional callback
    cb);
}


function createMonsters(cb) {
  async.parallel([
      function (callback) {
        monsterCreate('Drow', 'Medium humanoid', 'Neutral evil elf', 13, 15, 0, ['Shortsword', 'Hand Crossbow'], callback);
      },
      function (callback) {
        monsterCreate('Badger', 'Tiny beast', 'unaligned', 3, 10, 0, ['bite'], callback);
      },
      function (callback) {
        monsterCreate('Rat', 'Tiny beast', 'unaligned', 3, 10, 0, ['bite'], callback);
      },
      function (callback) {
        monsterCreate('Giant Badger', 'Small beast', 'unaligned', 7, 12, 0, ['Bite'], callback);
      },
      function (callback) {
        monsterCreate('Giant Rat', 'Small beast', 'unaligned', 7, 12, 0, ['Bite'], callback);
      },
      function (callback) {
        monsterCreate('Baboon', 'Small beast', 'unaligned', 3, 12, 0, ['Bite'], callback);
      },
      function (callback) {
        monsterCreate('Skeleton', 'Medium undead', 'lawful evil', 13, 13, 0, ['Shortsword', 'Shortbow'], callback);
      },
      function (callback) {
        monsterCreate('Zombie', 'Medium undead', 'neutral evil', 22, 8, 0, ['Slam'], callback);
      },
      function (callback) {
        monsterCreate('Sprite', 'Tiny fey', 'neutral good', 2, 15, 0, ['Longsword', 'Shortbow', 'Invisibility'], callback);
      },
      function (callback) {
        monsterCreate('Flesh Golem', 'Medium construct', 'neutral', 92, 9, 0, ['Multiattack', 'Slam'], callback);
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
  function (err) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    }
    else {
      console.log('Monsters: ' + monsters);
      console.log('Heroes: ' + heroes);

    }
    // All done, disconnect from database
    // noinspection JSIgnoredPromiseFromCall
    mongoose.connection.close();
  });



