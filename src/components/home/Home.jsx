import React, { useEffect } from 'react';
import PokeApi from '../../assets/pokeapi.png';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {

    useEffect(() => {
        document.getElementById('footerID').classList.add('position');
    });

    return (
        <div className='home-content'>
            <div className='container'>
                <h1>
                    Welcome to the Pokedex, powered by 
                    <a href='https://pokeapi.co/' target='_blank' rel='noreferrer'>
                        <img src={PokeApi} alt='PokeApi Logo' className='pokeapi-img'></img>
                    </a>
                </h1>
            </div>
            <p>Here you will find the whole list of pokemons and their own descriptions.</p>
            <p>You can also see the full list of pokemons <Link to='/pokedex-app/browse' id='hereLink'>here</Link></p>
        </div>
    );
}

export default Home;
