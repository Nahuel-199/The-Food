import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getRecipes, filterXtypes, orderXhealthScore,
     orderXname, getDiets} from '../../action/index';
import { BsArrowRepeat } from "react-icons/bs";
import SearchBar from '../searchBar/SearchBar';
import Pages from '../pages/Pages';
import './home.css';

const Home = () => {

    const dispatch = useDispatch();

    const diets = useSelector((state) => state.diets);

     //estado para orderXname
     const[,setOrderName] = useState('');
    
     //estado para orderXrating
     const[,setOrderHealth] = useState('')

    useEffect(() => {
        dispatch(getRecipes());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getDiets());
    }, [dispatch])
    
    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes());
    }

    function handleFilterTypes(e) {
        dispatch(filterXtypes(e.target.value));
    }

    function handleOrderName(e) {
        e.preventDefault(e);
        dispatch(orderXname(e.target.value));
        // setCurrentPage(1);
        setOrderName(`Ordenado ${e.target.value}`)
    }

    function handleOrderHealth(e) {
        dispatch(orderXhealthScore(e.target.value));
        setOrderHealth(`Ordenado ${e.target.value}`);
    }

    return (
        <div>
        <SearchBar />
         <div className="todo">
             <div className="selects">
             <BsArrowRepeat size={25} className="refresh" onClick={e => {handleClick(e)}} />
             <select className="selected-home" onChange={e => handleOrderName(e)}>
               <option>Order</option>
                <option value='asc'>Ascendenet</option>
                <option value='desc'>Descendente</option>
            </select>
            <select className="selected-home" onChange={(e) => {handleOrderHealth(e)}}>
                <option>Score</option>
             <option value='max'>Max HealthScore</option>
             <option value='min'>Min HealthScore</option>
            </select>
            <select className="selected-home" onChange={(e) => {handleFilterTypes(e)}}>
        <option value="All">Types</option>
         {diets && diets.map((el) => {
           return <option key={el.id} value={el.name}>{el.name}</option>
          })}
     </select>
             </div>
            <Pages/>
        </div>
     </div>
    )
}

export default Home;