import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDetail } from '../../action';
import { useParams } from 'react-router-dom';
import loading from '../../img/coock.gif';
import './details.css';

export default function Details() {
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getDetail(id))
    },[dispatch, id])

    const recipe = useSelector((state) => state.details);

    return (
        <div className="container-detail">
            {
                recipe ?
                <div className="detail">
                    <h2 className="name">{recipe.name}</h2>
                    <img className="img" src={recipe.image} alt="img not found..." />
                    {recipe.type?
                  <h3 className="type">DishType: {recipe.type}</h3> : null}
                    <h4 className="score">HealthScore: {recipe.healthScore}⭐</h4>
                <h4 className="level">HealthLevel: {recipe.healthLevel}</h4>
                  <p className="summary">Resume:<div dangerouslySetInnerHTML={{ __html: recipe.resume}} /></p>
                <h4 className="steps">Steps:<div dangerouslySetInnerHTML={{ __html: recipe.steps}} /></h4>
                <h3 className="diet">Diet: {!recipe.createdInDB? 
                recipe.diets + ', ' : recipe.dietTypes.map((e) => e.name + ', ')}</h3>
                </div>
                :
                <img className="gif-loading" src={loading} alt="Loading..." />
            }
               <Link to= '/home'>
               <button className="back-det"> BACK
                 </button> 
        </Link>
        </div>
    )
}