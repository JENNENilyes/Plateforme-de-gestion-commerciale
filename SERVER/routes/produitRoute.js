const router = require('express').Router();
const produitController = require('../controllers/produitController');


router.get('/', produitController.readProduit);
router.get('/:id', produitController.readProduitId);

router.post('/', produitController.createProduit);
router.put('/update/:id', produitController.updateProduit);
router.put('/plu', produitController.updateQtePlus);
router.put('/subb', produitController.updateQteMoin);


router.delete('/:id', produitController.deleteProduit);



module.exports = router;
