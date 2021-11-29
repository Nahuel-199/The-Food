import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameRecipes } from '../../action/index';
import { Link } from 'react-router-dom';
import food from '../../img/Food.png';
import { BsSearch } from "react-icons/bs";
import './search.css';

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState();

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getNameRecipes(name))
    }

    return (
        <div className="container-search">
              <div className="Logo"> 
                    <Link to="/"> <img className="Logo" alt="Not found" id="" src={food} width="15px" /> </Link>
                </div> 
            <input
            className="input-search"
            type='text'
            placeholder='Search...'
            onChange= {(e) => handleInputChange(e)}
            />
            <BsSearch className="icon" size={25} type='submit' 
            onClick= {(e) => handleSubmit(e)} />
            <div className="create">
                    <Link to="/createdrecipes"><p className="create-nav">CREATE RECIPES</p></Link>
                </div>
        </div>
    )
}