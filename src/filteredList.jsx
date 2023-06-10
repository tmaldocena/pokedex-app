import React, { useState, useEffect } from "react";
import axios from "axios";

const FilteredList = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [selectedType, setSelectedType] = useState("");
  
    useEffect(() => {
      const fetchPokemonList = async () => {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
        const pokemonData = await Promise.all(response.data.results.map(getPokemonData));
        setPokemonList(pokemonData);
      };
      fetchPokemonList();
    }, []);
  
    useEffect(() => {
      const filteredList = pokemonList.filter((pokemon) => {
        return pokemon.types.includes(selectedType.toLowerCase());
      });
      setFilteredPokemonList(filteredList);
    }, [pokemonList, selectedType]);
  
    const getPokemonData = async (pokemon) => {
      const response = await axios.get(pokemon.url);
      return {
        name: pokemon.name,
        types: response.data.types.map((type) => type.type.name),
      };
    };
  
    const handleTypeChange = (event) => {
      setSelectedType(event.target.value);
    };
  
    const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  
    return (
      <div>
        <select onChange={handleTypeChange}>
          <option default>Select a type</option>
          <option value="grass">Grass</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
        </select>
        <ul>
          {filteredPokemonList.map((pokemon, index) => (
            <li key={index}>
              {pokemon.name} ({pokemon.types.join(", ")})
            </li>
          ))}
        </ul>
      </div>
    );
  };

export default FilteredList;