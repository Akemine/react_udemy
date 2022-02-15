import React, { FunctionComponent, useState, useEffect } from 'react';
import POKEMONS from "../models/mock-pokemon"
import Pokemon from '../models/pokemon'
import PokemonCard from '../components/pokemon-card'
  
const PokemonList: FunctionComponent = () => {
 const [pokemons, setPokemons] = useState<Pokemon[]>([])

 useEffect(() => {
  setPokemons(POKEMONS)
 }, []);

 return (
  <div>
  <h1 className='center'>Mon Pokédex</h1>
    <div className='container'>
      <div className='row'>
      {pokemons.map(pokemon => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} borderColor="teal" ></PokemonCard>
      ))}
      </div>
    </div>
  </div>
 )
}
  
export default PokemonList;