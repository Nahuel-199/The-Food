import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { postRecipes, getDiets } from '../../action';
import { useDispatch, useSelector } from 'react-redux';
import './create.css';

export default function Created() {
    const dispatch = useDispatch();
    const diets = useSelector((state) => state.diets)
    const navigat = useNavigate();

    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: "",
        resume: "",
        healthScore: "",
        healthLevel: "",
        steps: "",
        image: "",
        diets: []
    });

    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch]);

    function validate(input) {
        let errors = {};
        if (!input.name) {
            errors.name = "Name is Required"
        }else if (!input.resume) {
            errors.resume = "Resume is Required"
        }else if (!input.healthScore) {
            errors.healthScore = "Score Number is Required"
        }else if (!input.healthLevel) {
            errors.healthLevel = "Level Number is Required"
        }else if (!input.steps) {
            errors.steps = "Steps is Required"
        }else if (!input.image) {
            errors.image = "Image is Required"
        }
            return errors;
    };

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }

    function handleSelect(e) {
        if(input.diets.includes(e.target.value)){
            alert("You already selected this types.")
        }else if(input.diets.length >= 3) {
            alert("You can selected up to 3 types.")
        }else {
        setInput({
            ...input,
            diets: [...input.diets, e.target.value]
        })
    }
  };

    function handleDelete(i) {
        setInput({
            ...input,
            diets: input.diets.filter(el => el !== i)
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (Object.values(errors).length > 0) {
            alert('Missing Data to Send Form')
        }
        else {
            dispatch(postRecipes(input));
            alert('Recipes Created');
            setInput({
                name: "",
                resume: "",
                healthScore: "",
                healthLevel: "",
                steps: "",
                image: "",
                diets: [],
            })
        }
            navigat('/home')
       
    }


    return (
        <div className="container-form">
            <h1 className="title-form">Created you Recipes</h1>
            <Link to='/home' >
                        <button className="salida">❌</button>
                    </Link>
            <form className="form" onSubmit={(e) => handleSubmit(e)} onKeyPress={(e) => {
                if (e.key === "Enter") {
                    handleSubmit(e)
                }
            }}
                autoComplete="off">
                <div className="div">
                    <label className="label">Name:</label>
                    <input
                        className='input'
                        type='text'
                        placeholder='Name...'
                        value={input.name}
                        name='name'
                        onChange={(e) => { handleChange(e) }}
                        required='true'
                    />
                    {errors.name && (
                        <p className="danger">{errors.name}</p>
                    )}
                </div>
                <div className="div">
                    <label className="label">Image:</label>
                    <input
                    className="input"
                        type='text'
                        placeholder='Image url...'
                        value={input.image}
                        name='image'
                        onChange={(e) => { handleChange(e) }}
                    />
                       {errors.image && (
                        <p className="danger">{errors.image}</p>
                    )}
                </div>
                <div className="div">
                    <label className="label">Resume:</label>
                    <input
                        className='input'
                        type='text'
                        placeholder='Resume...'
                        value={input.resume}
                        name='resume'
                        onChange={(e) => { handleChange(e) }}
                        required='true'
                    />
                      {errors.resume && (
                        <p className="danger">{errors.resume}</p>
                    )}
                </div>
                <div className="div">
                    <label className="label">Score:</label>
                    <input
                        className='input'
                        type='number'
                        placeholder='Score...'
                        max='100'
                        min='1'
                        value={input.healthScore}
                        name='healthScore'
                        onChange={(e) => { handleChange(e) }}
                        required='true'
                    />
                     {errors.healthScore && (
                        <p className="danger">{errors.healthScore}</p>
                    )}
                </div>
                <div className="div">
                    <label className="label">Level:</label>
                    <input
                        className='input'
                        type='number'
                        placeholder='Level...'
                        max='100'
                        min='1'
                        value={input.healthLevel}
                        name='healthLevel'
                        onChange={(e) => { handleChange(e) }}
                    />
                       {errors.healthLevel && (
                        <p className="danger">{errors.healthLevel}</p>
                    )}
                </div>
                <div className="div">
                    <label className="label">Steps:</label>
                    <input
                        className='input'
                        type='text'
                        placeholder='Steps...'
                        value={input.steps}
                        name='steps'
                        onChange={(e) => { handleChange(e) }}
                    />
                       {errors.steps && (
                        <p className="danger">{errors.steps}</p>
                    )}
                </div>
                <div className="div2">
                    <label className="label">Diets:</label>
                    <select
                    className="select2"
                     onChange={(e) =>
                        handleSelect(e)}>
                        {diets.map((el) => (
                            <option className="options" key={el.id} value={el.name}>{el.name}</option>
                        ))}
                    </select>
                    <ul className="generos">
                        {input.diets.map((el, i) =>
                            {
                                return <div className="buton-div" key={i}>
                                    <li>{el}</li>
                                    <buton className="buton-form" onClick={() => { handleDelete(el); } }>❌</buton>
                                </div>;
                            }
                        )}
                    </ul>
                </div>
                <button className="type-submit" onClick={(e) => { handleSubmit(e)}}>
                    CREATE
                    </button>
            </form>
        </div>
    )
}
