import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Select.css';
import Dropdown from './Dropdown';

const Selects = () => {

    const [types, setTypes] = useState([]);
    const [redirect, setRedirect] = useState({});
    const [gen, setGen] = useState([]);

    useEffect(() => {
        const getTypes = async () => {
            const results = await axios(`https://pokeapi.co/api/v2/type/`);
            const types = results.data.results;
            console.log(types.slice(0,18));
            setTypes(types.slice(0,18));
        };
        const getGenerations = async () => {
            const results = await axios(`https://pokeapi.co/api/v2/generation/`);
            const gen = results.data.results;
            //console.log(gen[0].url);
            setGen(gen);
        }
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

    return (
        <div className='select-container'>
            <Dropdown/>
            <select id='select-Types' defaultValue={'0'} onChange={(e) => setRedirect({param: 'type',type: e.target.value})}>
                <option  disabled value='0'>Select a type</option>
                {
                    types.map((type, index)=> (
                        <option key={index} value={type.name}>{type.name}</option>
                    ))
                }
            </select>
            <select id='select-Gen' defaultValue={'0'} onChange={(e) => setRedirect({param: 'gen',type: e.target.value})}>
                <option disabled value='0' >Select a generation</option>
                {
                    gen.map((generation, index)=> (
                        <option key={index} value={getGenID(generation.url)}>{nameGeneration(generation.name)}</option>
                    ))
                }
            </select>
        </div>
    );
}

export default Selects;


/* - Martin Baró - Un desorden ordenado (Sistema, grupo y poder) [48, 63]
- Martin Baró - Los procesos de socializacion (Accion e ideologia) [113, 120]
- De La Corte Ibañez - La psicologia de Baró como psicologia social critica (Revolucion de psicologia general y aplicada) [437, 450]

// Import the axios library for making HTTP requests
const axios = require("axios");

// Make a GET request to the PokeAPI for the list of all Pokemon
axios.get("https://pokeapi.co/api/v2/pokemon?limit=1118")
    .then(function (response) {
        // Extract the list of Pokemon data from the response
        const pokemonList = response.data.results;

        // Filter the Pokemon that are Normal type
        const normalPokemon = [];
        pokemonList.forEach(function(pokemon) {
            // Make a GET request to the PokeAPI for the Pokemon's details
            axios.get(pokemon.url)
                .then(function(response) {
                    const pokemonDetails = response.data;
                    // Check if the Pokemon is Normal type
                    if(pokemonDetails.types.some(function(type) {
                        return type.type.name === "normal";
                    })) {
                        normalPokemon.push(pokemon.name);
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        });

        // Display the list of Normal type Pokemon
        console.log(normalPokemon);
    })
    .catch(function (error) {
        console.log(error);
    }); */