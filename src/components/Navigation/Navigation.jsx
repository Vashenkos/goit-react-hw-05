import React from 'react';  
import { NavLink } from 'react-router-dom';  
import styles from './Navigation.module.css';  

const Navigation = () => (  
    <nav >  
        <NavLink to="/" end>Home</NavLink>  
        <NavLink to="/movies">Movies</NavLink>  
    </nav>  
);  

export default Navigation;