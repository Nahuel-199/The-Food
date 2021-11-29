const { Router } = require('express');
const { DietType } = require('../db');
const router = Router();

router.get('/', async (req, res, next) => {
    const typesDiet = ['dairy free', 'vegan', 'gluten free',
     'lacto ovo vegetarian', 'pescatarian', 'paleolithic', 
     'primal', 'fodmap friendly', 'whole30', 'vegetarian'
    ];

    try{
        typesDiet.forEach((e) => {
            DietType.findOrCreate({
                where: { name: e },
                defaults: {
                    name: e,
                },
            });
        });
        
        const dietsAll = await DietType.findAll();
        res.send(dietsAll)

    } catch(error){
        next(error)
    }
});

module.exports = router;