import { gql } from '@apollo/client';

export const GET_POKEMON = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      moves {
        move {
          name
        }
      }
      types {
        type {
          name
        }
      },
    }
  }
`
