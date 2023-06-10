import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Autocomplete.css';

function Autocomplete() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
    const searchPokemon = async () => {
        const results = await axios(`https://pokeapi.co/api/v2/pokemon/?limit=1200`);
        const pokemonData = results.data.results;
        const searchResults = pokemonData.filter((pokemon) =>
        pokemon.name.includes(searchTerm.toLowerCase())
        );
        setSearchResults(searchResults);
    };

    if (searchTerm.length > 0) {
        searchPokemon();
    } else {
        setSearchResults([]);
    }
    }, [searchTerm]);

    const onInputChange = (event) => {
        setSearchTerm(event.target.value);
    };


    
    return (
    <div className='autocomplete-container' style={{position: 'relative'}}>
        <div className='input-div'>
            <input id='input-search' type="text" onChange={onInputChange} value={searchTerm} className='search-box' placeholder='Search pokemon...' />
            <span className='focus-border'></span>
        </div>
        { searchTerm.length >= 3 && (
            <div className="autocomplete-results">
                {searchResults.length > 0 ? (
                    <ul className="autocomplete-list">
                        {searchResults.map((result, index) => (
                            <Link className='pokeLi' onClick={()=> window.location.href = '/pokemon/'+result.name}>
                                <li key={index}>{result.name}</li>
                            </Link>
                    ))}
            </ul>
            ) : (
                <div className="autocomplete-no-results">No results found</div>
            )}
        </div>
        )}
    </div>
    );
};

export default Autocomplete;