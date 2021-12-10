const { Router } = require('express');
const { Recipe, DietType } = require('../db');
const axios =  require('axios').default;
const router = Router();
const { API_KEY } = process.env;


//Traemos la info de la API

const infoApi = async () => {
    const getApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=${100}`);
    const apiData = await getApi.data.results.map(e => {
        return {
            id: e.id,
            image: e.image,
            name: e.title,
            diets: e.diets,
            type: e.dishTypes,
            healthScore: e.healthScore,
        }
    });
    return apiData;
}

//Consulta a la DB

const infoDB = async () => {
    return await Recipe.findAll({
        include: {
            model: DietType,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
};



//Concatenacion de informaciones API + DB

const allRecipes = async () => {
    const apiData = await infoApi();
    const apiDB = await infoDB();
    const infoTotal = apiData.concat(apiDB);
    return infoTotal;
};

//Primer Get

router.get('/', async (req, res, next) => {
    //buscamos nombre por query
    const { name } = req.query;

    try{
        const totalRecipes = await allRecipes();

        if(name){
            const nameRecipes = await totalRecipes.filter(e =>
                e.name.toLowerCase().includes(name.toLocaleLowerCase())
                )
                nameRecipes.length ?
                res.send(nameRecipes) :
                res.status(404).send({error: 'no se ha encontrado la receta'})
        } else {
            res.status(200).send(totalRecipes)
        }
    } catch (error) {
        next(error)
    }
});

//Get por ID, para el detallado

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try{
        let recipeDB
        if(typeof id === 'string' && id.length > 10){
            recipeDB = await Recipe.findByPk(id, {
                include: {
                    model: DietType,
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    },
                },
            })
            res.send(recipeDB)
            //si no esta en la DB
        } else {
            const recipeApi = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
            return res.json({
                id: recipeApi.data.id,
                image: recipeApi.data.image,
                name: recipeApi.data.title,
                diets: recipeApi.data.diets,
                type: recipeApi.data.dishTypes,
                resume: recipeApi.data.summary,
                healthScore: recipeApi.data.healthScore,
                healthLevel: recipeApi.data.spoonacularScore,
                steps: recipeApi.data.instructions
            })

        }

    } catch(error) {
        next(error)
    }
});

module.exports = router;