import React, { useEffect, useState } from 'react';
import './Item.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PokeItem = ({ item }) => {

    const [pokemon, setPokemon] = useState({});
    const [types, setTypes] = useState([]);
    
    useEffect(() => {
        async function fetchData(){
            const result = await axios.get('https://pokeapi.co/api/v2/pokemon/'+item.name);
            setPokemon(result.data);
            setTypes(result.data.types);
        }
        fetchData();
    }, []);
    
    


    //console.log(types);
    let src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+ pokemon?.id +'.png';
    let link = '/pokemon/'+pokemon.id;
    if(pokemon === null){
        return (<span>Empty</span>)
    }else{
        return (
                <Link to={link} className="grid-item" id={pokemon.id}>
                    <span className='info__card'>
                        <h3>{ pokemon.name }</h3>
                        <h4>#{ pokemon.id }</h4>
                        <div className='card__badge'>
                            {
                                types.map((type, index) =>(
                                    <span className={`badge ${type.type.name}`} key={index}>{type.type.name}</span>
                                ))
                            }    
                        </div>
                    </span>
                    <img src={ src } alt={ pokemon.name }/>
                </Link>
            );
    }
}
export default PokeItem;
