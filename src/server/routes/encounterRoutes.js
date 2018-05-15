const express = require('express');
const router = express.Router();

const encounterController = require('../controllers/encounterController');

router.post('/saveEncounter', encounterController.saveEncounter);

// router.post('/deleteEncounter', encounterController.deleteEncounter);

router.post('/getEncounter', encounterController.getEncounter);

router.get('/getAllEncounters', encounterController.getAllEncounters);

module.exports = router;
