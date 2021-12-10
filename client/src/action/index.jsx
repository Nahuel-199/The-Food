import axios from 'axios';

//traemos las recipes
export function getRecipes() {
    return async function(dispatch){
        let res = await axios.get(
            "http://localhost:3001/recipes",{
          });
          
          return dispatch({
              type: 'GET_RECIPES',
              payload: res.data
          });
    }
}


//traemos las types
export function getDiets() {
    return async function(dispatch) {
        try{
            const info = await axios.get(
               "http://localhost:3001/types",{
          })
          return dispatch({
              type: 'GET_TYPES',
              payload: info.data
          })

    }catch (error){
            console.log(error)
        }
        
    }
}

//traemos la query del back para el search
export function getNameRecipes(name) {
    return async function(dispatch){
        try{
            let res = await axios.get(
                'http://localhost:3001/recipes?name=' + name
            )
            return dispatch({
                type: "GET_NAME_RECIPES",
                payload: res.data
            })
        }catch (error) {
            console.log(error)
        }
    }
}

//createdRecipes
export function postRecipes(payload) {
    return async function() {
        try{
        let response = await axios.post(
            "http://localhost:3001/created",payload
        );
        return response;
        } catch(err) {
           return {
               error: "Can't Create Recipes",
               originalError: err
           }
        }
    }
}

//detalle
export function getDetail (id) {
    return async function(dispatch){
        try{
            const res = await axios.get(
                `http://localhost:3001/recipes/${id}`
            );
            return dispatch({
                type: "GET_DETAILS",
                payload: res.data
            })
        } catch (err) {
            return {
                error: "Can't Get Details",
                originalError: err
            }
        }
    }
}

//filtroXTypes
export function filterXtypes(payload) {
    console.log('types', payload)
    return {
        type: 'FILTER_BY_TYPES',
        payload
    };
};

//orderXname
export function orderXname(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    };
};

//orderXhealthScore
export function orderXhealthScore(payload) {
    return {
        type: 'ORDER_BY_HEALTHSCORE',
        payload
    };
};