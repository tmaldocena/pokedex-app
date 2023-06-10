import React, { useEffect, useState } from 'react';
import expand from '../../../assets/expand.svg';
import './Dropdown.css';
import axios from 'axios';

const Dropdown = () => {

    const [types, setTypes] = useState([]);
    const [redirect, setRedirect] = useState({});
    const [gen, setGen] = useState([]);

    useEffect(() => {
        const getTypes = async () => {
            const results = await axios(`https://pokeapi.co/api/v2/type/`);
            const types = results.data.results;
            setTypes(types.slice(0,18));
        };
        const getGenerations = async () => {
            const results = await axios(`https://pokeapi.co/api/v2/generation/`);
            const gen = results.data.results;
            setGen(gen);
        };
        getTypes();
        getGenerations();
    }, []);

    useEffect(() => {
        if(redirect.param !== undefined){
            if(redirect.param === 'type'){
                window.location.href = '/browse/?type=' + redirect.type;
            }else{
                window.location.href = '/browse/?gen=' + redirect.type;
            }
        }
    }, [redirect]);

    const capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    
    function nameGeneration(gen) {
        switch (gen) {
            case "generation-i":
                return "Generation I";
            case "generation-ii":
                return "Generation II";
            case "generation-iii":
                return "Generation III";
            case "generation-iv":
                return "Generation IV";
            case "generation-v":
                return "Generation V";
            case "generation-vi":
                return "Generation VI";
            case "generation-vii":
                return "Generation VII";
            case "generation-viii":
                return "Generation VIII";
            case "generation-ix":
                return "Generation IX";
            default:
                break;
        }
    }

    function getGenID(url){
        const urlArray = url.split('/');
        const number = urlArray[urlArray.length -2];
        return number
    }

    function changeRedirect(e){
        setRedirect({param: 'gen', type: e.target.value});
    }

    return (
        <div className='dropdown-container'>
            <div className="dropdown" tabIndex="0">
                <button id="dropdown-btn">Select Type... <img src={expand} alt='dropdown' /></button>
                <ul className="dropdown-content" id="dropdown-content">
                    {
                        types.map((type, index)=>(
                            <li key={index} value={type.name} onClick={() => setRedirect({param: 'type', type: type.name})}>{capitalize(type.name)}</li>
                        ))
                    }
                </ul>
            </div>
            <div className="dropdown" tabIndex="0">
                <button id="dropdown-btn">Select Generation... <img src={expand} alt='dropdown' /></button>
                <ul className="dropdown-content" id="dropdown-content">
                    {
                        gen.map((generation, index)=> (
                            <li key={index} value={getGenID(generation.url)} onClick={(e) => changeRedirect(e)}>{nameGeneration(generation.name)}</li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default Dropdown;
