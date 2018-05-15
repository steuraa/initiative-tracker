const express = require('express');
const router = express.Router();

const encounterController = require('../controllers/progressEncounterController');

router.post('/saveProgressEncounter', encounterController.saveProgressEncounter);

// router.post('/deleteEncounter', encounterController.deleteEncounter);

router.post('/getProgressEncounter', encounterController.getProgressEncounter);

router.get('/getAllProgressEncounters', encounterController.getAllProgressEncounters);

module.exports = router;
