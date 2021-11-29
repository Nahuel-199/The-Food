import React, { useEffect, useState } from "react";
import Card from "../card/Card";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import { BsChevronDoubleLeft } from "react-icons/bs";
import { BsChevronDoubleRight } from "react-icons/bs";
import loading from '../../img/coock.gif';
import './pages.css';

export default function Pages() {
    const recipes = useSelector((state) => state.filter);
    const [ currentPage, setCurrentPage ] = useState(0);

    const nextPage = () => {
        if(recipes.length <= currentPage + 9) {
            setCurrentPage(currentPage);
        } else setCurrentPage(currentPage + 9);
    };

    const prevPage = () => {
        if(currentPage < 10){
            setCurrentPage(0);
        } else {
            setCurrentPage(currentPage - 9);
        }
    }

    const FirstPage = () => {
        setCurrentPage(0);
    };

    const lastPage = () => {
        setCurrentPage(recipes.length - 9);
    }

    useEffect(() => {
        FirstPage();
    }, [recipes]);

    const list = recipes.slice(currentPage, currentPage + 9);
    return (
        <div className="container-page">
            <div className="page-container">
               <BsChevronDoubleLeft className="start" onClick={FirstPage} />
               &nbsp;
               <BsChevronLeft size={25} className="back" onClick={prevPage} />
               &nbsp;
               <BsChevronRight size={25} className="back" onClick={nextPage} />
               &nbsp;
               <BsChevronDoubleRight className="end" onClick={lastPage} />
            </div>
            <div>
            {
            list.length === 0 ? 
            (<div>
                <img className="gif-loading" src={loading} alt="Loading..." />
                </div>) : list.map((el) => (
          <Link key={el.id} to={`/recipes/${el.id}`} style={{ textDecoration: 'none' }}>
            <Card className="card-pagination" 
            image={el.image} 
            name={el.name}
            diets={el.diets? el.diets : el.dietTypes.map(e => e.name)}
             healthScore={el.healthScore}
             /> 
          </Link>
        ))}  
            </div>
        </div>
    )
}