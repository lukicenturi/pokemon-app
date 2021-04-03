import Skeleton from 'react-loading-skeleton';
import FeatherIcon from 'feather-icons-react';
import { Pokemon } from '@/models/pokemon';
import { Link, NavLink } from 'react-router-dom';
import { myPokemonCard } from './MyPokemonCard.style';
import PokemonService from '@/services/pokemon.service';
import { useState } from 'react';
import AnimateHeight from 'react-animate-height';

const getImage = (id: string) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

export interface MyPokemonCardProps {
  pokemon?: {
    pokemon: Pokemon,
    names: string[],
  };
  loading?: boolean;
  onReleasePokemon?: (pokemon: string, name: string) => void;
}

const MyPokemonCard = ({ pokemon, loading = false, onReleasePokemon}: MyPokemonCardProps)  => {
  const [expanded, setExpanded] = useState(false);

  if (loading) {
    return (
      <Skeleton height={90} style={{ borderRadius: '0.75rem' }}/>
    )
  }

  return (
    <div css={myPokemonCard}>
      <div className="pokemon-image">
        <img src={getImage(pokemon!.pokemon.id!)} alt={pokemon!.pokemon.name}/>
      </div>
      <div className="pokemon-content">
        <Link to={'/' + pokemon!.pokemon.name} className="text-link">
          <div className="pokemon-name title-case">{pokemon!.pokemon.name}</div>
        </Link>
        <div className="badge-wrapper">
          <div className="badge">{PokemonService.getPokemonOwned(pokemon!.pokemon.name)} Owned</div>
          {
            pokemon!.pokemon.types.map((type) => (
              <div className="badge title-case" key={type.type.name}>{type.type.name}</div>
            ))
          }
        </div>
      </div>
      <div className="pokemon-nicknames">
        <div className="pokemon-nicknames-header" onClick={() => setExpanded(!expanded)}>
          <div className="pokemon-nicknames-header-text">
            {
              expanded ? 'Hide Names' : 'See Names'
            }
          </div>
          <FeatherIcon className="pokemon-nicknames-header-icon" size={20} icon={expanded ? 'chevron-up' : 'chevron-down'}/>
        </div>
        <AnimateHeight duration={300} height={expanded ? 'auto' : 0}>
          <div className="pokemon-nicknames-wrapper">
            {
              pokemon!.names.map((name) => (
                <div className="pokemon-nickname-wrapper" key={name}>
                  <div className="pokemon-nickname-button">
                    <button onClick={() => onReleasePokemon?.call(this, pokemon!.pokemon.name, name)}>
                      <FeatherIcon icon="x" size={16}></FeatherIcon>
                      <span>RELEASE</span>
                    </button>
                  </div>
                  <div className="pokemon-nickname">{name}</div>
                </div>
              ))
            }
          </div>
        </AnimateHeight>
      </div>
    </div>
  )
}

export default MyPokemonCard;
