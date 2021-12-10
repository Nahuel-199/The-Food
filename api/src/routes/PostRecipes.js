const { Router } = require('express');
const { Recipe, DietType } = require('../db');
const router = Router();

//creamos la receta

router.post('/', async (req, res, next) => {
    let  { name, resume, healthScore, healthLevel, steps, diets, image } = req.body;
    try {
        const newRecipe = await Recipe.create({
            name,
            resume,
            healthScore,
            healthLevel,
            steps,
            image
        })
        let typeDB = await DietType.findAll({
            where: { name: diets },
        });
        await newRecipe.addDietType(typeDB);
        res.send(newRecipe);

    }catch (error) {
        next(error)
    }
});

module.exports = router;