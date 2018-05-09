var express = require('express');
var router = express.Router();

var monsterController = require('../controllers/monsterController');

router.get('/saveMonster', monsterController.saveMonster);

router.post('/deleteMonster', monsterController.deleteMonster);

router.post('/getMonster', monsterController.getMonster);

router.get('/getAllMonsters', monsterController.getAllMonsters);

module.exports = router;