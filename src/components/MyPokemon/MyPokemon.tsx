import PokemonService from '@/services/pokemon.service';
import { useEffect, useState } from 'react';
import MyPokemonCard from '@/components/MyPokemonCard/MyPokemonCard';
import { myPokemonGrid, noPokemonWrapper } from './MyPokemon.style';
import { Link } from 'react-router-dom';

const MyPokemon = () => {
  const [pokemons, setPokemons] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyPokemons();
  }, []);

  const fetchMyPokemons = () => {
    setLoading(true);
    setPokemons(PokemonService.getMyPokemon());
    setLoading(false);
  }

  const releasePokemon = (pokemon: string, name: string) => {
    PokemonService.removePokemon(pokemon, name);

    fetchMyPokemons();
  }

  if (loading) {
    return (
      <div>
        <h1>Your Pokemon</h1>
        <div css={myPokemonGrid}>
          {
            [...Array(10)].map((e, i) => (
              <MyPokemonCard loading={true} key={i}/>
            ))
          }
        </div>
      </div>
    )
  }

  if (Object.keys(pokemons!).length == 0) {
    return (
      <div css={noPokemonWrapper}>
        <h1>Oops, you don't have any pokemon yet!!</h1>
        <Link to='/'>
          <button className="btn-soft-red">
            Go catch some
          </button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h1>Your Pokemon</h1>
      <div css={myPokemonGrid}>
        {
          Object.keys(pokemons!).map((key) => (
            <MyPokemonCard pokemon={pokemons![key]} key={key} onReleasePokemon={releasePokemon} />
          ))
        }
      </div>
    </div>
  );
}

export default MyPokemon;
