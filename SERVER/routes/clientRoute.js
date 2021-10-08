const router = require('express').Router();
const clientController = require('../controllers/clientController');
const jwt = require('../middleware/jwt');
const admin = require('../middleware/jwt');

//router.get('/' , clientController.readClient);
router.get('/', jwt.authJwt,jwt.admin, clientController.readClient);


router.post('/', clientController.createClient);
router.post('/register', clientController.RegisterClient);

router.post('/login', clientController.loginClient);

router.put('/:id', clientController.updateClient);
router.delete('/:id', clientController.deleteClient);



module.exports = router;
