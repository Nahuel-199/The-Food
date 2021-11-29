const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routerRecipes = require('./Recipes.js');
const routerTypes = require('./Types.js');
const routerPost = require('./PostRecipes.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', routerRecipes);
router.use('/types', routerTypes);
router.use('/created', routerPost);

module.exports = router;
