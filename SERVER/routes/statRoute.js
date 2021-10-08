const router = require('express').Router();
const statController = require('../controllers/statController');

router.get('/', statController.readStat);
router.get('/:id', statController.readStatId);

router.post('/', statController.createStat);
router.post('/Nom', statController.readStatNom);



module.exports = router;