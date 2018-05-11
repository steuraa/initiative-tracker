const express = require('express');
const router = express.Router();

const monsterController = require('../controllers/monsterController');

router.post('/saveMonster', monsterController.saveMonster);

router.post('/deleteMonster', monsterController.deleteMonster);

router.post('/getMonster', monsterController.getMonster);

router.get('/getAllMonsters', monsterController.getAllMonsters);

module.exports = router;
