import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './PokeInfo.css';

const PokeInfo = () => {
    let  {id}  = useParams();

    const [pokemon, setPokemon] = useState(null);
    const [species, setSpecies] = useState(null);
    const [version, setVersion] = useState(null);
    const [evolutionChain, setEvolutionChain] = useState([]);
    const [form, setForm] = useState(null);
    const [shiny, setShiny] = useState('');;

    useEffect(() => {
        async function fetchData(){
            const result = await axios.get('https://pokeapi.co/api/v2/pokemon/'+ id);
            setPokemon(result.data);
            const specie = await axios.get(result.data.species.url);
            setSpecies(specie.data);
            console.log(result.data.forms[0].url);
            const formReq = await axios.get(result.data.forms[0].url);
            //console.log(formReq);
            setForm(formReq.data);
            const versionReq = await axios.get(formReq.data.version_group.url);
            setVersion(versionReq.data);
            setShiny('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+result.data.id+'.png');
        }
        fetchData();
        const footer = document.getElementById('footerID');
        if(footer.classList.contains('position')){
            footer.classNameList.remove('position');
        }
    }, [id]);

    useEffect(() => {
        async function fetchEvolutionChain() {
            if(pokemon?.species) {
                const response = await axios.get(pokemon?.species.url);
                const data = await response.data;
                const evoResponse = await fetch(data?.evolution_chain.url);
                const evoData = await evoResponse.json();
                setEvolutionChain(getEvolutions(evoData.chain));
            }
        }
        fetchEvolutionChain();
    }, [pokemon]);

    function getEvolutions(evoData) {
        let result = [];
        result.push({
            id: getPokemonIdFromUrl(evoData?.species.url),
            name: evoData?.species.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonIdFromUrl(evoData?.species.url)}.png`
        });
        if (evoData.evolves_to.length !== 0) {
            evoData.evolves_to.forEach((evo) => {
                result = result.concat(getEvolutions(evo));
            });
        }
        return result;
    }

    function getPokemonIdFromUrl(pokemonUrl) {
        const parts = pokemonUrl.split('/');
        return parts[parts.length - 2];
    }

    const setNormal = () => {
        setShiny('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+pokemon.id+'.png');
    }

    const setVariocolor = () => {
        setShiny('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/'+pokemon.id+'.png');
    }

    let pokemonTypes = [];
    pokemon?.types.map((type) => pokemonTypes.push(type.type.name));

    let generation = (gen) => {
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

    const reloadPage = (idP)=>{
        id = idP;
        //window.location.reload() 
    }

    return (
    <div className='container-pokeInfo'>
        <div className='paragraph'>
            <p><strong>{pokemon?.name}</strong> it's a <u>{pokemonTypes.join('/')}</u> Pokemon introduced into the <strong>{generation(version?.generation.name)}</strong>.</p>
            <p>{species?.flavor_text_entries.find(text => text.language.name === "en").flavor_text.replace("\f", " ")}</p>


            <h3 style={{marginTop: "3rem"}}>Evolution chain</h3>
            <div className="evolution-chain">
            {evolutionChain.map((evolution, index) => (
                <Link to={'/pokemon/'+evolution.id} key={index} className="evolution-container" onClick={() => reloadPage(evolution.id)}>
                <div className="evolution-card">
                    <h3>{evolution.name}</h3>
                    <img src={evolution.sprite} alt={evolution.name} />
                </div>
                {index !== evolutionChain.length - 1 && (
                    <div className="arrow">→</div>
                )}
                </Link>
            ))}
            </div>
        </div>
        <div className="card">
            <h1 className="card__title">{pokemon?.name}</h1>
            <span className="card__subtitle">{species?.names[0].name} ({species?.names[1].name})</span>
            <div className="card__image">
                <img src={shiny} alt='The official art of the pokemon'></img>
            </div>
            <div className="card__buttons">
                <button className="card__button" onClick={setNormal}>Normal</button>
                <button className="card__button" onClick={setVariocolor}>Shiny</button>
            </div>
            <p className="card__text">Pokedex ID: {pokemon?.id}</p>
            <div className='card__badge'>
                {
                    pokemon?.types.map((type, key) => (
                        <span className={`badge ${type?.type.name}`} key={key}>{type?.type.name}</span>
                    ))
                }
            </div>
        </div>
    </div>
    );
}

export default PokeInfo;
