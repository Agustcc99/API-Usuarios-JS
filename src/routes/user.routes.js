const { Router } = require('express');
const ctrl = require('../controllers/users.controller'); // NO .default, NO destructuring raro

const router = Router();

router.get('/', ctrl.getAll);      
router.post('/', ctrl.create);     
router.put('/:id', ctrl.update);   
router.delete('/:id', ctrl.remove);

module.exports = router;
 //module.exports define qué parte de ese archivo vas a “exportar” para que otros archivos puedan usarlo con require(...)