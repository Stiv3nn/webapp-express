// IMPORTIAMO EXPRESS
const express = require('express');
// RICHIAMIAMO IL ROUTER
const router = express.Router();

// IMPORTIAMO I CONTROLLER
const movieController = require("../controllers/moviesController");

// ROTTE
router.get('/', movieController.index);

router.get('/:id', movieController.show);





// ESPORTIAMO IL MODULO
module.exports = router;