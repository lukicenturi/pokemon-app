import { gql } from 'apollo-boost';

export const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      results {
        id
        name,
        image,
      }
    }
  }
`;
