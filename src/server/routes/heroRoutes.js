var express = require('express');
var router = express.Router();

var heroController = require('../controllers/heroController');

router.get('/saveHero', heroController.saveHero);

router.post('/deleteHero', heroController.deleteHero);

router.post('/getHero', heroController.getHero);

router.get('/getAllHeroes', heroController.getAllHeroes);

module.exports = router;