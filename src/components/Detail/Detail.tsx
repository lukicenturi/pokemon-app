import { useQuery } from '@apollo/client';
import { PokemonData, PokemonDataVars } from '@/models/pokemon';
import { GET_POKEMON } from '@/queries/detail';
import { useParams } from 'react-router-dom'
import { detailWrapper } from './Detail.style';
import { baseColor, baseDarkRed } from '@/variables';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import PokemonService from '@/services/pokemon.service';
import { CommonUtil } from '@/utils/common.util';
import toTitleCase = CommonUtil.toTitleCase;
import getRandomColor = CommonUtil.getRandomColor;

const getImage = (id: string) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
}

const PokemonMovesWrapper = ({ pokemon }) => {
  return (
    <div className="pokemon-moves-wrapper">
      {
        pokemon.moves.map((move) => (
          <div className="pokemon-move" data-testid="pokemon-move" style={{ backgroundColor: getRandomColor()}} key={move.move.name}>{toTitleCase(move.move.name)}</div>
        ))
      }
    </div>
  );
}

const MemoizedPokemonMovesWrapper = memo(PokemonMovesWrapper);

const Detail = () => {
  // @ts-ignore
  const { name } = useParams();

  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);
  const [saved, setSaved] = useState(false);
  const [pokemonName, setPokemonName] = useState('');
  const [isNameValid, setNameValidity] = useState(false);

  const {
    loading,
    data
  } = useQuery<PokemonData, PokemonDataVars>(GET_POKEMON, {
    variables: {
      name
    }
  });

  if (loading) return (
    <div css={detailWrapper}>
      <div>
        <div className="pokemon-name">
          <Skeleton width={200} />
        </div>
        <div className="badge-wrapper">
          {
            [...Array(3)].map((e, i) => (
              <div className="badge" key={i}>
                <Skeleton width={40} />
              </div>
            ))
          }
        </div>
        <div className="pokemon-image">
          <SkeletonTheme color={baseColor} highlightColor={baseDarkRed}>
            <Skeleton width={300} height={360} />
          </SkeletonTheme>
        </div>
        <div className="pokemon-catch-wrapper">
          <Skeleton width={225} height={52} style={{ borderRadius: '4rem' }}/>
        </div>
        <div className="pokemon-moves">
          <h1>Moves List</h1>
          <div className="pokemon-moves-wrapper">
            {
              [...Array(20)].map((e, i) => (
                <Skeleton height={57} style={{ borderRadius: '0.75rem', display: 'block' }} key={i}/>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )

  const pokemon = data!.pokemon;

  const catchPokemon = () => {
    const succeed = Math.random() > 0.5;

    if (succeed) {
      setPokemonNameAndValidate(toTitleCase(pokemon.name));
      setShowSuccess(true);
    } else {
      setShowFailed(true);
    }
  }

  const setPokemonNameAndValidate = (value) => {
    setPokemonName(value);
    if (value && !PokemonService.isNameUsed(value)) {
      setNameValidity(true);
    } else {
      setNameValidity(false);
    }
  }

  const closeModal = () => {
    setShowSuccess(false);
    setSaved(false);
    setPokemonName(pokemon.name);
    setNameValidity(true);
  }

  const onPokemonNameInput = (ev) => {
    const value = ev.target.value;
    setPokemonNameAndValidate(value);
  }

  const savePokemon = () => {
    PokemonService.addPokemon(pokemon, pokemonName);
    setSaved(true);
  }

  return (
    <div css={detailWrapper}>
      <div>
        <div data-testid="pokemon-name" className="pokemon-name title-case">{pokemon.name}</div>
        <div className="badge-wrapper">
          <div className="badge"><span data-testid="pokemon-owned">{PokemonService.getPokemonOwned(pokemon.name)}</span> Owned</div>
          {
            pokemon.types.map((type) => (
              <div className="badge title-case" data-testid="pokemon-type" key={type.type.name}>{type.type.name}</div>
            ))
          }
        </div>
      </div>
      <div className="pokemon-image">
        <img src={getImage(pokemon.id!)} alt={pokemon.name}/>
      </div>
      <div className="pokemon-catch-wrapper">
        <button className="pokemon-catch-button" onClick={catchPokemon}>Catch Pokemon</button>
      </div>
      <div className="pokemon-moves">
        <h1>Moves List</h1>
        <MemoizedPokemonMovesWrapper pokemon={pokemon}/>
      </div>
      <div className={"pokemon-modal pokemon-success-modal " + (showFailed ? 'show' : '')}>
        <div className="pokemon-modal-wrapper">
          { showFailed && <input type="hidden" data-testid="catch-status" value="failed"/> }
          <h2>Ouch, try again!</h2>
          <div className="pokemon-modal-action">
            <button data-testid="failed-close-button" className="btn-red" onClick={() => setShowFailed(false)}>
              Close
            </button>
          </div>
        </div>
      </div>
      <div className={"pokemon-modal pokemon-success-modal " + (showSuccess ? 'show' : '')}>
        <div className="pokemon-modal-wrapper">
          { showSuccess && <input type="hidden" data-testid="catch-status" value="success"/> }
          <h4>You successfully caught</h4>
          <div className="title-case pokemon-name">{pokemon.name}</div>
          <div className="className pokemon-image">
            <img src={getImage(pokemon.id!)} alt={pokemon.name}/>
          </div>
          <div className="pokemon-modal-action">
            {
              !saved && (
                <>
                  <label htmlFor="name-input">Give me a name</label>
                  <input data-testid="name-input" id="name-input" type="text" placeholder="Give your pokemon a name" value={pokemonName} onInput={onPokemonNameInput}/>
                  <button data-testid="name-submit-button" className="btn-soft-red" onClick={savePokemon} disabled={!isNameValid}>
                    { isNameValid ? 'Submit' : 'Ouch, try different name'}
                  </button>
                </>
              )
            }
            {
              saved && (
                <Link data-testid="pokemon-list-button" to='/my-pokemon'>
                  <button className="btn-soft-red">
                    Check Your Pokemon List
                  </button>
                </Link>
              )
            }
            <button data-testid="success-close-button" className="btn-red" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
