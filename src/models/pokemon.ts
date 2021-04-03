export interface Pokemon {
  moves: {
    move: {
      name: string
    }
  }[];
  types: {
    type: {
      name: string
    }
  }[];
  url?: string;
  id: string;
  name: string;
  image: string;
}

export interface PokemonData {
  pokemon: Pokemon;
}

export interface PokemonsData {
  pokemons: {
    results: Pokemon[];
  };
}

export interface PokemonsDataVars {
  limit: number;
  offset: number;
}

export interface PokemonDataVars {
  name: string;
}
