import { useQuery } from '@apollo/client';
import { GET_POKEMONS } from '@/queries';
import { PokemonsData, PokemonsDataVars, Pokemon } from '@/models/pokemon';
import React from 'react';
import PokemonCard from '@/components/PokemonCard/PokemonCard';
import { pokemonGrid } from './Home.style';

const Home = () => {

  const {
    loading,
    data
  } = useQuery<PokemonsData, PokemonsDataVars>(GET_POKEMONS, {
    variables: {
      limit: 100,
      offset: 0,
    }
  });

  if (loading) {
    return (
      <div>
        <h1 data-testid="header-title">Pokelist</h1>
        <div css={pokemonGrid}>
          {
            [...Array(20)].map((e, i) => (
                <PokemonCard key={i} loading={true}/>
            ))
          }
        </div>
      </div>
    )
  }

  const pokemons = data!.pokemons.results;

  return (
    <div>
      <h1 data-testid="header-title">Pokelist</h1>
      <div css={pokemonGrid}>
        {
          pokemons.map((pokemon: Pokemon) => (
            <PokemonCard pokemon={pokemon} key={pokemon.id}/>
          ))
        }
      </div>
    </div>
  );
}

export default Home;
