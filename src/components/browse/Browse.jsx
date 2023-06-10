import React, { Suspense, useEffect, useState } from 'react';
import './Browse.css';
import axios from 'axios';

const PokeItem = React.lazy(() => import('./item/PokeItem') );

const Browse = () => {

    const [data, setData] = useState([]);
    const [number, setNumber] = useState(0);
    const [filter, setFilter] = useState({type: null});
    const [filteredByType, setfilteredByType] = useState([]);
     
    useEffect(() => {
        async function fetchData(){
            const result = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=' + (number+9));
            const dataResults = result.data.results;
            setData(dataResults);
        }
        async function fetchDataTypes(type){
            const result = await axios.get('https://pokeapi.co/api/v2/type/'+ type);
            const pokemonFiltered = result.data.pokemon;
            console.log(pokemonFiltered.map(poke => poke.pokemon));
            setData(pokemonFiltered.map(poke => poke.pokemon));
        }
        async function fetchDataGen(gen){
            const result = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=' + gen.limit + '&offset='+ gen.offset);
            const dataResults = result.data.results;
            setData(dataResults);
        }
        let params = (new URL(document.location).searchParams);
        if(params.get('type')){
            setFilter({type: 'type',param: params.get('type')});
            console.log('aca');
            fetchDataTypes(params.get('type'));
        }else{
            if (params.get('gen')) {
                setFilter({type: 'gen', param: params.get('gen')});
                let generationID = params.get('gen');
                console.log(getLimitAndOffset(generationID));
                fetchDataGen(getLimitAndOffset(generationID));
            }else{
                fetchData();
            }
        }
        document.getElementById('footerID').classList.remove('position');
    }, [number]);
    
    const getLimitAndOffset = (selectedGen) => {
        let limit, offset;
        switch (selectedGen) {
        case "1":
            limit = 151;
            offset = 0;
            break;
        case "2":
            limit = 100;
            offset = 151;
            break;
        case "3":
            limit = 135;
            offset = 251;
            break;
        case "4":
            limit = 107;
            offset = 386;
            break;
        case "5":
            limit = 156;
            offset = 493;
            break;
        case "6":
            limit = 72;
            offset = 649;
            break;
        case "7":
            limit = 88;
            offset = 721;
            break;
        case "8":
            limit = 89;
            offset = 809;
            break;
        default:
            limit = 110;
            offset = 905;
            break;
        }
        return { limit, offset };
    }

    return (
        <div>
            <h1 className='title'>Browse the whole list of Pokemons!</h1>
            <div className="section">
                <div>
                    <div className="grid-row" id='pokeList'>
                        <Suspense fallback={<p>Loading...</p>}>
                            {
                                data?.map((item, index) =>{
                                    return <PokeItem key={index} item={item} />
                            })}
                        </Suspense>
                    </div>
                </div>
                <div id='buttonNext' onClick={()=>setNumber(number+9)}></div>
            </div>
        </div>
    );
}

export default Browse;
