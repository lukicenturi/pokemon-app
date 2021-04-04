import { Pokemon } from '@/models/pokemon';
import { pokemonCard } from './PokemonCard.style';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import PokemonService from '@/services/pokemon.service';

export interface PokemonCardProps {
  pokemon?: Pokemon;
  loading?: boolean;
}
const PokemonCard = ({ pokemon, loading = false }: PokemonCardProps) => {
  if (loading) {
    return (
      <Skeleton height={90} style={{ borderRadius: '0.75rem' }}/>
    )
  }
  return (
    <Link to={'/' + pokemon!.name} className="text-link">
      <div css={pokemonCard}>
        <div className="pokemon-name title-case">{pokemon!.name}</div>
        <span className="pokemon-owned"><span data-testid="pokemon-owned">{PokemonService.getPokemonOwned(pokemon!.name)}</span> Owned</span>
        <div className="pokemon-image">
          <img src={pokemon!.image} alt={pokemon!.name}/>
        </div>
      </div>
    </Link>
  )
}

export default PokemonCard
