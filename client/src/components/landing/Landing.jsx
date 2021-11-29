import React from 'react';
import { Link } from 'react-router-dom';
import './landing.css';

const Landing = () => {
    return (
        <div className="container-landing">
             <header className="landing-header">
                 <div className="container-title">
                 <h1 className="title">Welcome The Food World!</h1>
                 </div>
            <Link to ='/home'>
            <div class="wrapper">
               <button className="but"> GO!
                     </button>
               </div>
            </Link>
            </header>
        </div>
    )
}

export default Landing;